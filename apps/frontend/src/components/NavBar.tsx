import React, { useState } from "react";
import { Menu, X, User, Search, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { logout } from "../services/authService";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountMenu = () => setIsAccountOpen(!isAccountOpen);

  const closeMenu = () => setIsMenuOpen(false); 
  const closeAccountMenu = () => setIsAccountOpen(false); 

  const menuItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/dish", label: "Món ăn" },
    { href: "/tips", label: "Mẹo nhà bếp" },
    { href: "/market", label: "Cửa hàng" },
  ];

  const accountItems = [
    { href: "/profile", label: "Thông tin tài khoản", icon: <User className="w-5 h-5 mr-2" /> },
    { href: "/sign-in", label: "Đăng xuất", icon: <LogOut className="w-5 h-5 mr-2 text-black-600" />, onClick: logout },
  ];

  return (
    <nav className="relative bg-white border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src="./logo.png" alt="Logo" className="h-20 w-20 mr-2" />
            <Link to="/" className="font-lobster text-2xl text-blue-600">
              FlavorFood
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Search />
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                className="flex items-center px-3 py-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-300 transition duration-200"
              >
                {label}
              </Link>
            ))}

            {/* Account Section */}
            <div className="relative">
              <button
                onClick={toggleAccountMenu}
                aria-expanded={isAccountOpen}
                className="flex items-center px-3 py-2 rounded-md text-gray-800 hover:text-gray-900 hover:bg-gray-300"
              >
                Tài khoản
              </button>
              {isAccountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {accountItems.map(({ href, label, icon, onClick }) => (
                    <Link
                      key={href}
                      to={href}
                      onClick={() => {
                        if (onClick) onClick(); 
                        closeAccountMenu();
                      }}
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100"
                    >
                      {icon}
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-blue-100"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map(({ href, label }) => (
              <Link
                key={href}
                to={href}
                onClick={closeMenu} 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
              >
                {label}
              </Link>
            ))}

            {/* Mobile Account Section */}
            <div className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-blue-100">
              Tài khoản
            </div>
            <div className="pl-4 space-y-1">
              {accountItems.map(({ href, label, icon, onClick }) => (
                <Link
                  key={href}
                  to={href}
                  onClick={() => {
                    if (onClick) onClick(); 
                    closeMenu(); 
                  }}
                  className="flex items-center px-3 py-2 rounded-md text-gray-700 hover:bg-blue-100"
                >
                  {icon}
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
