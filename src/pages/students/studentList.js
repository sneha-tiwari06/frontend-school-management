import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const [formData, setFormData] = useState({
        classStudy: '',
        admissionyear: '',
    });
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const fetchStudents = async () => {
        setIsLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/students/students', {
                params: {
                    classStudy: formData.classStudy,
                    admissionyear: formData.admissionyear,
                },
            });
            setStudents(response.data);
        } catch (error) {
            console.error('Error fetching students:', error);
            setError('Failed to fetch students');
        } finally {
            setIsLoading(false);
        }
    };

    const isFormDataValid = formData.classStudy && formData.admissionyear;

    return (
        <div className="w-100 student-section">
            <div className="row g-0">
                <div className="col-md-10">
                    <div className="student-filter">
                        <h2 className='heading text-center'>Students Overview</h2>
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
                                    <button className='button-all' onClick={fetchStudents} disabled={isLoading}>
                                        {isLoading ? 'Loading...' : 'Show Students'}
                                    </button>
                                    <button className='button-all'>
                                        <Link to='/add-students'>Add Students</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="student-list mt-4">
                        {error && <p className="text-danger">{error}</p>}
                        {!isFormDataValid ? (
                            <p>Please select a class and year to view students.</p>
                        ) : students.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Class</th>
                                        <th>Year</th>
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
                                            <td>{`Class ${student.classStudy.replace('class', '')}`}</td>
                                            <td>{student.admissionyear}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No record found for the selected class and year.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentList;
