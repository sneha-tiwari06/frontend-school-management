import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './sidebar/dashboard';
import StudentList from './pages/students/studentList';
import StudentProfile from './pages/students/student-profile';
import AddStudents from './pages/students/add-students';
import CourseOverview from './pages/course/course-overview';
import AddCourse from './pages/course/add-course';
import AttendanceManagement from './pages/attendance/attendance-management';
import CourseDetails from './pages/course/course-details';
import QueryManagement from './pages/query/query-management';
import LibraryManagement from './pages/Inventory/library';
import ViewBooks from './pages/Inventory/view-books';

function App() {
  return (
    <Router>
      <div className='row w-100'>
        <div className='col-md-2 sidebar'>
          <Dashboard />
        </div>
        <div className='col-md-10 content'>
          <Routes>
            <Route path="/studentList" element={<StudentList />} />
            <Route path="/student-profile" element={<StudentProfile />} />
            <Route path="/student-profile/:id" element={<StudentProfile />} />
            <Route path="/add-students" element={<AddStudents />} />
            <Route path="/course-overview" element={<CourseOverview />} />
            <Route path="/add-course" element={<AddCourse />} />
            <Route path="/course-overview/:id" element={<CourseOverview />} />
            <Route path="/course-details/:id" element={<CourseDetails />} />
            <Route path="/edit-course/:id" element={<AddCourse />} />
            <Route path="/attendance-management" element={<AttendanceManagement />} />
            <Route path="/query-management" element={<QueryManagement />} />
            <Route path="/library-management" element={<LibraryManagement />} />
            <Route path="/view-books" element={<ViewBooks />} />
          </Routes>

        </div>
      </div>
    </Router>




  );
}

export default App;

