import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function AddStudents() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        sname: '',
        mothersName: '',
        fathersName: '',
        classStudy: '',
        dob: '',
        gender: '',
        rollnumber: '',
        address: '',
        adhar: '',
        pan: '',
        tc: '',
        migration: '',
        cc: '',
        email: '',
        contact: '',
        contact2: '',
        password: '',
        image: '',
        admissionyear: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Changing:", name, "to", value);
        setFormData({
            ...formData,
            [name]: value,
        });
    };



    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
            if (!allowedTypes.includes(file.type)) {
                alert('Invalid file type. Only JPG, JPEG, PNG, and WEBP files are allowed.');
                return;
            }
            setFormData({
                ...formData,
                [name]: file
            });
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.sname.trim()) {
            newErrors.sname = "Please enter a Name.";
        }

        if (!formData.mothersName.trim()) {
            newErrors.mothersName = "Mother's Name is required.";
        }

        if (!formData.fathersName.trim()) {
            newErrors.fathersName = "Father's Name is required.";
        }

        if (!formData.classStudy.trim()) {
            newErrors.classStudy = "Class is required.";
        }

        if (!formData.dob.trim()) {
            newErrors.dob = "Date of Birth is required.";
        } else {
            const dob = new Date(formData.dob);
            const today = new Date();
            const minDate = new Date(today.getFullYear() - 3, today.getMonth(), today.getDate());
            if (dob > minDate) {
                newErrors.dob = "Date of Birth should be at least 3 years before the current year.";
            }
        }

        if (!formData.gender.trim()) {
            newErrors.gender = "Gender is required.";
        }

        if (!formData.rollnumber.trim()) {
            newErrors.rollnumber = "Roll Number is required.";
        }

        if (!formData.address.trim() || formData.address.length < 6) {
            newErrors.address = "Address should be at least 6 characters long.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email address is invalid.";
        }

        if (!formData.contact.trim()) {
            newErrors.contact = "Contact Number is required.";
        } else if (!/^[789]\d{9}$/.test(formData.contact)) {
            newErrors.contact = "Contact Number should be a 10-digit number starting with 7, 8, or 9.";
        }

        if (!formData.contact2.trim()) {
            newErrors.contact2 = "Emergency Contact Number is required.";
        } else if (!/^[789]\d{9}$/.test(formData.contact2)) {
            newErrors.contact2 = "Emergency Contact Number should be a 10-digit number starting with 7, 8, or 9.";
        }

        if (!formData.image) {
            newErrors.image = "Image is required.";
        } else if (!['image/jpeg', 'image/png', 'image/webp'].includes(formData.image.type)) {
            newErrors.image = "Invalid file type. Only JPG, JPEG, PNG, and WEBP files are allowed.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validate()) {
            return;
        }
    
        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }
    
        try {
            await axios.post('http://localhost:5000/api/students/students', form);
            
            Swal.fire({
                title: 'Success!',
                text: 'Student added successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/studentList');
            });
        } catch (error) {
            console.error('Error adding student:', error);

            Swal.fire({
                title: 'Error!',
                text: 'Failed to add student. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };
    

    return (
        <div className='w-100 mt-4 add-students'>
            <h2 className='heading'>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className="mb-3">
                            <label htmlFor="sname" className="form-label">Name</label>
                            <input type="text" className="form-control" name="sname" value={formData.sname} onChange={handleChange} />
                            {errors.sname && <span className="error">{errors.sname}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="mothersName" className="form-label">Mother's Name</label>
                            <input type="text" className="form-control" name="mothersName" value={formData.mothersName} onChange={handleChange} />
                            {errors.mothersName && <span className="error">{errors.mothersName}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="classStudy" className="form-label">Class</label>
                            <select name="classStudy" className="form-select" value={formData.classStudy} onChange={handleChange}>
                                <option value="">Select Class</option>
                                <option value="class1">Class 1</option>
                                <option value="class2">Class 2</option>
                                <option value="class3">Class 3</option>
                                <option value="class4">Class 4</option>
                                <option value="class5">Class 5</option>
                            </select>
                            {errors.classStudy && <span className="error">{errors.classStudy}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="admissionyear" className="form-label">Year Of Admission</label>
                            <select name="admissionyear" className="form-select" value={formData.admissionyear} onChange={handleChange}>
                                <option value="">Select Year</option>
                                <option value="2024">2024-25</option>
                            </select>
                            {errors.admissionyear && <span className="error">{errors.admissionyear}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dob" className="form-label">Date Of Birth</label>
                            <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                            {errors.dob && <span className="error">{errors.dob}</span>}
                        </div>
                        <div className="mb-3 gender d-flex">
                            <label htmlFor="gender" className="form-label">Gender</label>
                            <div>
                                <input
                                    type="radio"
                                    id="male"
                                    name="gender"
                                    value="Male"
                                    checked={formData.gender === 'Male'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="male" className="form-check-label">Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="female"
                                    name="gender"
                                    value="Female"
                                    checked={formData.gender === 'Female'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="female" className="form-check-label">Female</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="other"
                                    name="gender"
                                    value="Other"
                                    checked={formData.gender === 'Other'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="other" className="form-check-label">Other</label>
                            </div>
                            {errors.gender && <span className="error">{errors.gender}</span>}
                        </div>

                        <div className="mb-3">
                            <label htmlFor="adhar" className="form-label">Add Adhar Card</label>
                            <input className="form-control" type="file" name="adhar" onChange={handleFileChange} />
                            {errors.image && <span className="error">{errors.image}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="pan" className="form-label">Add Pan Card</label>
                            <input className="form-control" type="file" name="pan" onChange={handleFileChange} />
                            {errors.image && <span className="error">{errors.image}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tc" className="form-label">Add Transfer Certificate</label>
                            <input className="form-control" type="file" name="tc" onChange={handleFileChange} />
                            {errors.image && <span className="error">{errors.image}</span>}
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <div className="mb-3">
                            <label htmlFor="fathersName" className="form-label">Father's Name</label>
                            <input type="text" className="form-control" name="fathersName" value={formData.fathersName} onChange={handleChange} />
                            {errors.fathersName && <span className="error">{errors.fathersName}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="rollnumber" className="form-label">Roll No.</label>
                            <input type="text" className="form-control" name="rollnumber" value={formData.rollnumber} onChange={handleChange} />
                            {errors.rollnumber && <span className="error">{errors.rollnumber}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Upload Student's Image</label>
                            <input className="form-control" type="file" name="image" onChange={handleFileChange} />
                            {errors.image && <span className="error">{errors.image}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Student's Email ID</label>
                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                            {errors.email && <span className="error">{errors.email}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact" className="form-label">Student's Contact Number</label>
                            <input type="text" className="form-control" name="contact" value={formData.contact} onChange={handleChange} />
                            {errors.contact && <span className="error">{errors.contact}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="contact2" className="form-label">Emergency Contact Number</label>
                            <input type="text" className="form-control" name="contact2" value={formData.contact2} onChange={handleChange} />
                            {errors.contact2 && <span className="error">{errors.contact2}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cc" className="form-label">Add Character Certificate</label>
                            <input className="form-control" type="file" name="cc" onChange={handleFileChange} />
                            {errors.image && <span className="error">{errors.image}</span>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="migration" className="form-label">Add Migration Certificate</label>
                            <input className="form-control" type="file" name="migration" onChange={handleFileChange} />
                            {errors.image && <span className="error">{errors.image}</span>}
                        </div>
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <textarea className="form-control" name="address" value={formData.address} onChange={handleChange} />
                    {errors.address && <span className="error">{errors.address}</span>}
                </div>
                <button type="submit" className="button-all">Submit</button>
            </form>
        </div>
    );
}

export default AddStudents;
