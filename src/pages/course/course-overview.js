import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseList = () => {
    const [formData, setFormData] = useState({
        classStudy: '',
        year: '',
    });
    const [courses, setCourses] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }));
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/courses/courses', {
                params: {
                    classStudy: formData.classStudy,
                    year: formData.year,
                },
            });
            setCourses(response.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    return (
        <div className="w-100 course-section">
            <div className="row g-0">
                <div className="col-md-10">
                    <div className="course-filter">
                        <h2 className='heading text-center'>Courses Overview</h2>
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
                                    <label htmlFor="year" className="form-label">Year</label>
                                    <select
                                        id="year"
                                        className="form-select"
                                        value={formData.year}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Year</option>
                                        <option value="2024">2024-25</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-md-4 mt-4'>
                                <div className='action-button d-flex'>
                                    <button className='button-all' onClick={fetchCourses}>Show Courses</button>
                                    <button className='button-all'><Link to='/add-course'>Add Course</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="course-list mt-4">
                        {courses.length > 0 ? (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Course Name</th>
                                        <th>Class</th>
                                        <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {courses.map((course, index) => (
                                        <tr key={course._id}>
                                            <td>
                                                <Link to={`/course-details/${course._id}`} className='id-course'>
                                                    {index + 1}
                                                </Link>
                                            </td>
                                            <td>{course.courseName}</td>
                                            <td>{`Class ${course.classStudy.replace('class', '')}`}</td>
                                            <td>{course.year}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>Please select a class and year to check courses.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseList;
