import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add/remove class to body for pushing effect
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.marginLeft = '280px';
      document.body.style.transition = 'margin-left 0.3s ease';
    } else {
      document.body.style.marginLeft = '0';
    }

    return () => {
      document.body.style.marginLeft = '0';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 h-[70px] bg-white shadow-md flex items-center justify-between px-8 z-[1000] transition-all duration-300 ${
          isMenuOpen ? 'ml-[280px]' : ''
        }`}
      >
        <div className="flex items-center">
          <button 
            className="flex flex-col gap-[5px] p-2 bg-transparent border-none cursor-pointer"
            onClick={toggleMenu}
          >
            <span 
              className={`w-[30px] h-[3px] bg-gray-800 rounded transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-x-[8px] translate-y-[8px]' : ''
              }`}
            ></span>
            <span 
              className={`w-[30px] h-[3px] bg-gray-800 rounded transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span 
              className={`w-[30px] h-[3px] bg-gray-800 rounded transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 translate-x-[8px] -translate-y-[8px]' : ''
              }`}
            ></span>
          </button>
        </div>

        <nav className="hidden md:flex gap-8 items-center">
          {/* <Link 
            to="/admin/AdminDashboard" 
            className="text-gray-800 text-base font-medium hover:text-blue-600 transition-colors duration-300"
          >
            admin
          </Link> */}


                <nav className="hidden md:flex gap-8 items-center">
        <Link 
            to="/admin/dashboard" 
            className="text-gray-800 text-base font-medium hover:text-blue-600 transition-colors duration-300"
        >
            Admin
        </Link>
</nav>
         
        </nav>
      </header>

      {/* Sidebar Menu */}
      <div 
        className={`fixed top-0 w-[280px] h-screen bg-slate-800 z-[1001] pt-20 transition-all duration-300 ${
          isMenuOpen ? 'left-0' : '-left-[280px]'
        }`}
      >
        <nav className="flex flex-col p-5">
         


                    <Link 
            to="/admin/dashboard" 
            className="text-white text-lg py-4 px-5 rounded-lg hover:bg-white-100 transition-colors duration-300 mb-2"
            onClick={toggleMenu}
            >
            Admin
            </Link>
          
        </nav>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed top-0 left-0 right-0 bottom-0  bg-opacity-50 z-[999] transition-opacity duration-300"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
}

export default Header;