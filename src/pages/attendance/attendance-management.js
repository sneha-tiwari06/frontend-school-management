import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axiosInstance from '../utils/axiosInstance';
const AttendanceManagement = () => {

    const [formData, setFormData] = useState({
        classStudy: '',
        admissionyear: '',
    });
    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleAttendanceChange = (studentId, value) => {
        setAttendance((prevData) => ({
            ...prevData,
            [studentId]: {
                ...prevData[studentId],
                status: value,
            },
        }));
    };

    const handleTimeChange = (studentId, time) => {
        setAttendance((prevData) => ({
            ...prevData,
            [studentId]: {
                ...prevData[studentId],
                time: time,
            },
        }));
    };
    const fetchStudents = async () => {
        try {
            const studentsResponse = await axiosInstance.get('/students/students', {
                params: {
                    classStudy: formData.classStudy,
                    admissionyear: formData.admissionyear,
                },
            });

            const studentsData = studentsResponse.data;
            setStudents(studentsData);

            // Check attendance for each student
            const checkAttendancePromises = studentsData.map(async (student) => {
                const attendanceResponse = await axiosInstance.get('/attendance/attendance/check', {
                    params: { studentId: student._id },
                });
                return { ...student, attendanceMarked: attendanceResponse.data.marked };
            });

            const studentsWithAttendanceStatus = await Promise.all(checkAttendancePromises);
            setStudents(studentsWithAttendanceStatus);

        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const submitAttendance = async () => {
        try {
            const attendanceRecords = Object.keys(attendance).map(studentId => {
                const student = students.find(s => s._id === studentId);
                return {
                    studentId,
                    rollNumber: student.rollnumber,
                    name: student.sname,
                    status: attendance[studentId].status,
                    time: attendance[studentId].status === 'Late' ? attendance[studentId].time : null,
                };
            });

            const response = await axiosInstance.post('/attendance/attendance', { attendanceRecords });
            console.log('Attendance submitted successfully:', response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Attendance submitted successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {
            console.error('Error submitting attendance:', error);
        }
    };


    return (
        <div className="w-100 student-section">
            <div className="row g-0">
                <div className="col-md-10">
                    <div className="student-filter">
                        <h2 className='heading text-center'>Attendance Management</h2>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className="mb-3">
                                    <label htmlFor="classStudy" className="form-label">Class</label>
                                    <select
                                        id="classStudy"
                                        className="form-select"
                                        value={formData.classStudy}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Class</option>
                                        <option value="class1">Class 1</option>
                                        <option value="class2">Class 2</option>
                                        <option value="class3">Class 3</option>
                                        <option value="class4">Class 4</option>
                                        <option value="class5">Class 5</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className="mb-3">
                                    <label htmlFor="admissionyear" className="form-label">Year Of Admission</label>
                                    <select
                                        id="admissionyear"
                                        className="form-select"
                                        value={formData.admissionyear}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="2024">2024-25</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-4 mt-4'>
                                <div className='action-button d-flex'>
                                    <button className='button-all' onClick={fetchStudents}>Show Students</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="student-list mt-4">
                        {students.length > 0 ? (
                            <>
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Roll Number</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student, index) => (
                                            <tr key={student._id}>
                                                <td>
                                                    <Link to={`/student-profile/${student._id}`} className='id-student'>
                                                        {index + 1}
                                                    </Link>
                                                </td>
                                                <td>{student.sname}</td>
                                                <td>{student.rollnumber}</td>
                                                <td>
                                                    {student.attendanceMarked ? (
                                                        <span>Attendance Already Marked</span>
                                                    ) : (
                                                        <div className="attendance-options d-flex">
                                                            <div>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`attendance-${student._id}`}
                                                                        value="Present"
                                                                        checked={attendance[student._id]?.status === 'Present'}
                                                                        onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                                                                    />
                                                                    Present
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`attendance-${student._id}`}
                                                                        value="Absent"
                                                                        checked={attendance[student._id]?.status === 'Absent'}
                                                                        onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                                                                    />
                                                                    Absent
                                                                </label>
                                                            </div>
                                                            <div>
                                                                <label>
                                                                    <input
                                                                        type="radio"
                                                                        name={`attendance-${student._id}`}
                                                                        value="Late"
                                                                        checked={attendance[student._id]?.status === 'Late'}
                                                                        onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
                                                                    />
                                                                    Late
                                                                </label>
                                                                {attendance[student._id]?.status === 'Late' && (
                                                                    <input
                                                                        type="time"
                                                                        className="form-control"
                                                                        value={attendance[student._id]?.time || ''}
                                                                        onChange={(e) => handleTimeChange(student._id, e.target.value)}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                </table>
                                <button className="button-all mt-4" onClick={submitAttendance}>Submit Attendance</button>
                            </>
                        ) : (
                            <p>Please select a class and year to check student.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AttendanceManagement;
