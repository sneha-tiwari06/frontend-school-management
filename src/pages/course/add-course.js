import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';


function AddCourse() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [courseName, setCourseName] = useState('');
    const [classStudy, setClassStudy] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    useEffect(() => {
        if (id) {
            setIsEditing(true);
            const fetchCourse = async () => {
                try {
                    const response = await axiosInstance.get(`/courses/courses/${id}`);
                    const course = response.data;
                    setCourseName(course.courseName);
                    setClassStudy(course.classStudy);
                    setYear(course.year);
                    setDescription(course.description);
                } catch (error) {
                    console.error('Failed to fetch course:', error);
                    alert('Failed to fetch course data.');
                }
            };

            fetchCourse();
        } else {
            setIsEditing(false);
        }
    }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!courseName || !classStudy || !year || !description) {
            alert('Please fill in all fields.');
            return;
        }
    
        try {
            const courseData = { courseName, classStudy, year, description };
    
            if (isEditing && id) {
                await axiosInstance.put(`/courses/courses/${id}`, courseData);
                alert('Course updated successfully!');
            } else {
                await axiosInstance.post('/courses/courses', courseData);
                alert('Course added successfully!');
            }
    
            setCourseName('');
            setClassStudy('');
            setYear('');
            setDescription('');
    
            navigate('/course-overview');
        } catch (error) {
            console.error('Failed to save course:', error.response?.data || error.message);
            alert('Failed to save course. Please try again.');
        }
    };
    
    return (
        <div className='w-100 mt-4 add-course'>
            <h2 className='heading'>{isEditing ? 'Edit Course' : 'Add Course'}</h2>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="mb-3">
                            <label htmlFor="courseName" className="form-label">Course Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Course Name"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="selectStudy" className="form-label">Select Class</label>
                            <select value={classStudy} className="form-select" onChange={(e) => setClassStudy(e.target.value)}>
                                <option value="">Select Class</option>
                                <option value="class1">Class 1</option>
                                <option value="class2">Class 2</option>
                                <option value="class3">Class 3</option>
                                <option value="class4">Class 4</option>
                                <option value="class5">Class 5</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="courseyear" className="form-label">Select Year</label>
                            <select value={year} className="form-select" onChange={(e) => setYear(e.target.value)}>
                                <option value="">Select Year</option>
                                <option value="2024">2024-25</option>
                                {/* Add more year options as needed */}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                placeholder="Description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <button type="submit" className='button-all'>{isEditing ? 'Update Course' : 'Add Course'}</button>
            </form>
        </div>
    );
}

export default AddCourse