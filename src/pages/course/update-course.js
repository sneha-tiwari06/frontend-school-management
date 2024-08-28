import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateCourse = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState('');
    const [classStudy, setClassStudy] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/courses/${id}`);
                const course = response.data;
                setCourseName(course.courseName);
                setClassStudy(course.classStudy);
                setYear(course.year);
                setDescription(course.description);
            } catch (error) {
                console.error('Failed to fetch course:', error);
            }
        };

        fetchCourse();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const updatedCourse = { courseName, classStudy, year, description };
            await axios.put(`http://localhost:5000/api/courses/courses/${id}`, updatedCourse);
            alert('Course updated successfully!');
            navigate('/courses');
        } catch (error) {
            console.error('Failed to update course:', error);
            alert('Failed to update course.');
        }
    };

    return (
        <div>
            <h2>Update Course</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Course Name</label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Class</label>
                    <select value={classStudy} onChange={(e) => setClassStudy(e.target.value)} required>
                        <option value="">Select Class</option>
                        <option value="10">Class 10</option>
                        <option value="12">Class 12</option>
                    </select>
                </div>
                <div>
                    <label>Year</label>
                    <select value={year} onChange={(e) => setYear(e.target.value)} required>
                        <option value="">Select Year</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select>
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Update Course</button>
            </form>
        </div>
    );
};

export default UpdateCourse;
