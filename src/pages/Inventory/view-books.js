import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ViewBooks() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchBooks = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get('http://localhost:5000/api/library/books');
            setBooks(response.data);
        } catch (err) {
            setError('Failed to fetch books.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);


    return (
        <div>
            <div className='intro-section'>
                <div className='view-books'>
                    <h3 className='sub-heading'>Check Available Books</h3>
                </div>
                <div className='mt-4 back-button'>
                    <button className='btn btn-primary'><Link to='/library-management'>back</Link></button>
                </div>
            </div>

            <div>
            </div>
            <div className="books-list">
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : books.length > 0 ? (
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Index</th>
                                <th scope="col">Book Name</th>
                                <th scope="col">Author</th>
                                <th scope="col">Available Qunatity</th>
                                <th scope="col">Year</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book, index) => (
                                <tr key={book._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.quantity}</td>
                                    <td>{book.year}</td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No books available.</p>
                )}
            </div>
        </div>
    );
}

export default ViewBooks;
