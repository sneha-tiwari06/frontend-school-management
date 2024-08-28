import React, { useState } from 'react'
import { Link } from 'react-router-dom';

function Dashboard() {
    const [isStudentModuleOpen, setIsStudentModuleOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [isCourseModuleOpen, setCourseModuleOpen] = useState(false);
    const [isReportModuleOpen, setReportModuleOpen] = useState(false);

    const toggleStudentModule = (e) => {
        e.stopPropagation();
        setIsStudentModuleOpen(!isStudentModuleOpen);
        setActiveTab(isStudentModuleOpen ? '' : 'studentModule');
    };
    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };
    const toggleCourseModule = (e) => {
        e.stopPropagation();
        setCourseModuleOpen(!isCourseModuleOpen);
        setActiveTab(isCourseModuleOpen ? '' : 'courseModule');
    };
    const toggleReportModule = (e) => {
        e.stopPropagation();
        setReportModuleOpen(!isReportModuleOpen);
        setActiveTab(isReportModuleOpen ? '' : 'reportModule');
    };


    return (
        <div className='w-100 dashboard-main'>


                    <div className='dashboard-body'>
                        <div className='dashboard-header'>
                            <h2 className='dashboard-title mb-4 text-center'>Welcome!</h2>
                        </div>
                        <div className='dashboard-content'>
                            <div className='dashboard-tab '>
                                <p><img className="img-fluid icons" src="../assets/dashboard.png" alt='' /><span>Dashboard</span></p>
                            </div>
                            <div className='dashboard-tab 'onClick={toggleCourseModule}>
                                <p>
                                    <img className="img-fluid icons" src="../assets/learning.png" alt='' />
                                    <span>Course Management</span>
                                    <img className={`arrow-icon ${isCourseModuleOpen ? 'rotate' : ''}`} src="../assets/down.png" alt="arrow icon" />
                                    </p>
                                    {isCourseModuleOpen && (
                                    <div className="dropdown-content" onClick={handleDropdownClick}>
                                        <p><img className='dropdown-icon' src='../assets/add.png' alt='' /><span><Link to = '/course-overview'>Course Overview</Link></span></p>
                                        <p><img className='dropdown-icon' src='../assets/rupee-indian.png' alt='' /><span>Assign course</span></p>

                                    </div>
                                )}
                            </div>
                            <div className='dashboard-tab '>
                                <p><img className="img-fluid icons" src="../assets/profit.png" alt='' /><span>Accounts Management</span></p>
                            </div>
                            <div className='dashboard-tab ' onClick={toggleStudentModule} >
                                <p>
                                    <img className="img-fluid icons" src="../assets/students.png" alt='' />
                                    <span>Student Management</span>
                                    <img className={`arrow-icon ${isStudentModuleOpen ? 'rotate' : ''}`} src="../assets/down.png" alt="arrow icon" />
                                </p>
                                {isStudentModuleOpen && (
                                    <div className="dropdown-content" onClick={handleDropdownClick} >
                                        <p><img className='dropdown-icon' src='../assets/add.png' alt='' /><span><Link to ='/studentList'>Student List</Link></span></p>
                                        <p><img className='dropdown-icon' src='../assets/rupee-indian.png' alt='' /><span>Fees Management</span></p>
                                        <p><img className='dropdown-icon' src='../assets/report.png' alt='' /><span>Reports Management</span></p>

                                    </div>
                                )}
                            </div>
                            <div className='dashboard-tab ' onClick={toggleReportModule} >
                                <p>
                                    <img className="img-fluid icons" src="../assets/students.png" alt='' />
                                    <span>Report Management</span>
                                    <img className={`arrow-icon ${isReportModuleOpen ? 'rotate' : ''}`} src="../assets/down.png" alt="arrow icon" />
                                </p>
                                {isReportModuleOpen && (
                                    <div className="dropdown-content" onClick={handleDropdownClick} >
                                        <p><img className='dropdown-icon' src='../assets/user.png' alt='' /><span><Link to ='/attendance-management'>Attendance Management</Link></span></p>
                                        <p><img className='dropdown-icon' src='../assets/performance.png' alt='' /><span>Performance Tracking</span></p>
                                        <p><img className='dropdown-icon' src='../assets/fee.png' alt='' /><span>Student Fees Report</span></p>

                                    </div>
                                )}
                            </div>
                            <div className='dashboard-tab '>
                                <p><img className="img-fluid icons" src="../assets/open-book.png" alt='' /><span>Examination Management</span></p>
                            </div>
                            <div className='dashboard-tab '>
                                <p><img className="img-fluid icons" src="../assets/book.png" alt='' /><span><Link to='/library-management'>Library/ Assets Management</Link></span></p>
                            </div>
                            <div className='dashboard-tab '>
                                <p><img className="img-fluid icons" src="../assets/admission.png" alt='' /><span>Admission Management</span></p>
                            </div>
                            <div className='dashboard-tab '>
                                <p><img className="img-fluid icons" src="../assets/bus.png" alt='' /><span>Transport Management</span></p>
                            </div>
                            <div className='dashboard-tab '>
                                <p><img className="img-fluid icons" src="../assets/question.png" alt='' /><span><Link to='/query-management'>Query Management</Link></span></p>
                            </div>

                        </div>
                    </div>


            </div>

    )
}

export default Dashboard