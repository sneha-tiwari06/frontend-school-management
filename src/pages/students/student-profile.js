import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentProfile = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/students/students/${id}`);
                setStudent(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch student details');
                setLoading(false);
            }
        };

        fetchStudent();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    const handleViewImage = (imageUrl) => {
        window.open(imageUrl, '_blank');
    };

    return (
        <div className="student-profile">
            <h2 className='heading'>Student Profile</h2>
            {student ? (
                <div className='container'>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded section-start">
                        <div className='row'>
                            <div className='col-md-8'>
                                <p><strong>Student Name:</strong> <span>{student.sname}</span></p>
                                <p><strong>Student Father's Name:</strong> <span>{student.fathersName}</span></p>
                                <p><strong>Student Mother's Name:</strong> <span>{student.mothersName}</span></p>
                                <p><strong>Student Class: </strong><span>{`Class ${student.classStudy.replace('class', '')}`}</span></p>
                                <p><strong>Student Date Of Birth:</strong> <span>{student.dob.slice(0, 10)}</span></p>
                                <p><strong>Student Gender: </strong><span>{student.gender}</span></p>
                                <p><strong>Student Roll Number:</strong> <span>{student.rollnumber}</span></p>
                                <p><strong>Student Address: </strong><span>{student.address}</span></p>
                                <p><strong>Student Admission Year:</strong> <span>{student.admissionyear}</span></p>
                                <div className="documents-img d-flex">
                                    <div className="image-section">

                                        <button
                                            onClick={() => handleViewImage(student.adhar)}
                                            className="doc-btn"
                                        >
                                            View Adhar
                                        </button>
                                    </div>

                                    <div className="image-section">

                                        <button
                                            onClick={() => handleViewImage(student.pan)}
                                             className="doc-btn"
                                        >
                                            View Pan Card
                                        </button>
                                    </div>

                                    <div className="image-section">

                                        <button
                                            onClick={() => handleViewImage(student.tc)}
                                              className="doc-btn"
                                        >
                                            View TC
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <p><img src={student.image} alt="Student" style={{ width: '2in', height: '2in' }} /></p>

                            </div>

                        </div>
                    </div>
                </div>
            ) : (
                <p>No student data available</p>
            )}
        </div>
    );
};

export default StudentProfile;
