import React, { useState, useEffect } from 'react';
import axios from 'axios';

function QueryManagement() {
    const [queries, setQueries] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {

        axios.get('http://localhost:5000/api/remarks/')
            .then(response => {
                setQueries(response.data);
            })
            .catch(error => {
                console.error('Error fetching queries:', error);
            });


        axios.get('http://localhost:5000/api/students/')
            .then(response => {
                setStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

    const getClassStudy = (rollNumber) => {
        const student = students.find(student => student.rollnumber === rollNumber);
        if (student) {
            const formattedClass = student.classStudy.replace(/^class/i, 'Class ');
            return formattedClass.charAt(0).toUpperCase() + formattedClass.slice(1);
        }
        return student ? student.classStudy : 'N/A';
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 heading">Query Management</h2>
            <h2 className='sub-heading'>Attendance Query</h2>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>Serial No.</th>
                        <th>Roll No.</th>
                        <th>Date of Query Submitted</th>
                        <th>Reason</th>
                        <th>Class Of Study</th>
                    </tr>
                </thead>
                <tbody>
                    {queries.map((query, index) => (
                        <tr key={query._id}>
                            <td>{index + 1}</td>
                            <td>{query.rollNumber}</td>
                            <td>{new Date(query.date).toLocaleDateString()}</td>
                            <td>{query.reason}</td>
                            <td>{getClassStudy(query.rollNumber)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default QueryManagement;
