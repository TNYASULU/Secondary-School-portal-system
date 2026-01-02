// import { Routes, Route, NavLink } from 'react-router-dom';
// import About from './About';
// import Home from './HomePage';

// function Routing() {
//   return (
//     <>
//       <nav>
//         <NavLink to="/">Home</NavLink> |{" "}
//         <NavLink to="/about">About</NavLink>
//       </nav>

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </>
//   );
// }

// export default Routing;







// import { Routes, Route } from 'react-router-dom';
// import Header from './partials/Header';
// import Footer from './partials/Footer';
// import About from './About';
// import Home from './HomePage';
// import AdminRoutes from './AdminRoutes';

// function Routing() {
//   return (
//     <div className="min-h-screen flex flex-col pt-[70px]">
//       <Header />
      
//       <main className="flex-1 p-10 max-w-6xl mx-auto w-full transition-all duration-300">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/link1" element={<div><h1 className="text-3xl font-bold">Link 1 Page</h1></div>} />
//           <Route path="/link2" element={<div><h1 className="text-3xl font-bold">Link 2 Page</h1></div>} />
//           <Route path="/link3" element={<div><h1 className="text-3xl font-bold">Link 3 Page</h1></div>} />
//           <Route path="/link4" element={<div><h1 className="text-3xl font-bold">Link 4 Page</h1></div>} />
//            <Route path="/admin/*" element={<AdminRoutes />} />
//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Routing;





import { Routes, Route } from 'react-router-dom';
import Header from './partials/Header';
import Footer from './partials/Footer';
import About from './About';
import Home from './HomePage';
import AdminDashboard from './admin/AdminDashboard';
import StudentsList from './admin/StudentsList';
import AddGrade from './admin/AddGrade';
import EditStudent from './admin/EditStudent';
import AddStudent from './admin/Addstudent';

function Routing() {
  return (
    <div className="min-h-screen flex flex-col pt-[70px]">
      <Header />
      
      <main className="flex-1 p-10 max-w-6xl mx-auto w-full transition-all duration-300">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/form/:formId/students" element={<StudentsList />} />
           <Route path="/admin/student/add" element={<AddStudent />} />
          <Route path="/admin/student/:studentId/add-grade" element={<AddGrade />} />
          <Route path="/admin/student/:studentId/edit" element={<EditStudent />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default Routing;