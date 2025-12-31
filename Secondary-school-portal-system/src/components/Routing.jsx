import{ NavLink, Routes, Route } from 'react-router-dom';
import About from './About';
import Login from '../pages/auth/Login';

function Routing() {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink> |{" "}
        <NavLink to="/about">About</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default Routing;
