import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function CourseDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [courses, setCourses] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/courses/${id}`);
                setCourses(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch course details');
                setLoading(false);
            }
        };

        fetchCourses();
    }, [id]);


    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/courses/courses/${id}`);
            alert('Course deleted successfully');
            navigate('/course-overview');
        } catch (err) {
            setError('Failed to delete course');
        }
    };
    return (
        <div className="course-details">
            <h2 className='heading'>Course Details</h2>
            {courses ? (
                <div className='container'>
                    <div className="shadow-lg p-3 mb-5 bg-white rounded section-start">
                        <div className='row'>
                            <div className='col-md-8'>
                                <p><strong>Course Name:</strong> <span>{courses.courseName}</span></p>
                                <p><strong>Class Name:</strong> <span>{courses.classStudy}</span></p>
                                <p><strong>Description:</strong> <span>{courses.description}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>No course data available</p>
            )}
            <div className="action-button">
                <Link className="update-button" to={`/edit-course/${id}`} state={courses}>
                    Update Course
                </Link>
                {/* <button className="update-button" onClick={handleUpdate}>Update Course</button> */}
                <button className="delete-button" onClick={handleDelete}>Delete Course</button>
            </div>
        </div>

    )
}

export default CourseDetails