import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const LibraryManagement = () => {
    const navigate = useNavigate();
    const [book, setBook] = useState({
        title: '',
        author: '',
        studentClass: '',
        quantity: '',
        year: ''
    });

    const handleChange = (e) => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/library/addBook', book)
            .then(response => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Book added successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/view-books');
                });

                setBook({ title: '', author: '', studentClass: '', quantity: '', year: '' });
            })
            .catch(error => {
                console.error('Error adding book:', error);

                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add book. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    return (
        <div>
            <h2 className='heading'>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className="form-label">Title:</label>
                    <input type="text" className="form-control" name="title" value={book.title} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Author:</label>
                    <input type="text" className="form-control" name="author" value={book.author} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Class (Optional):</label>
                    <input type="text" className="form-control" name="studentClass" value={book.studentClass} onChange={handleChange} />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Quantity:</label>
                    <input type="number" className="form-control" name="quantity" value={book.quantity} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Year:</label>
                    <input type="number" className="form-control" name="year" value={book.year} onChange={handleChange} required />
                </div>
                <button type="submit" className='button-all'>Add Book</button>
            </form>
        </div>
    );
};

export default LibraryManagement;
