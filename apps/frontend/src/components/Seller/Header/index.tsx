import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Menu,
  X,
  Users,
  LogOut,
  Home,
  ChefHat,
  Lightbulb,
  ShoppingBasket,
  Store,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { User } from "../../../pages/Profile/Profile.interface";

const SellerHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAccountMenu = () => setIsAccountOpen(!isAccountOpen);
  const fontStyle = document.createElement('style');
  fontStyle.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Niconne&display=swap');
  `;
  document.head.appendChild(fontStyle);


  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await axiosInstance.get<User>('/auth/profile');
      setAvatarUrl(response.data.avatar || "../../avatar.jpg");
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setAvatarUrl(null);
    }
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    const handleUserProfileUpdated = () => {
      fetchUserProfile();
    };
    window.addEventListener('userProfileUpdated', handleUserProfileUpdated);

    return () => {
      window.removeEventListener('userProfileUpdated', handleUserProfileUpdated);
    };
  }, [fetchUserProfile]);

  const handleLogout = async () => {
    try {
      const response = axiosInstance
        .post("/auth/logout", { withCredentials: true })
        .then((response) => {
          setAvatarUrl(null);
          navigate("/sign-in");
        })

    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };
  const accountItems = [
    {
      href: "seller/profile",
      label: "Thông tin tài khoản",
      icon: <Users className="w-5 h-5 mr-2" />,
    },
    {
      label: "Đăng xuất",
      icon: <LogOut className="w-5 h-5 mr-2 text-gray-600" />,
      onClick: handleLogout,
    },
  ];
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <nav className="relative bg-white border-b border-gray-200 shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/seller" className="flex items-center space-x-2">
            <img src="./logo1.png" alt="Logo" className="h-20" />
            <span
              style={{ fontFamily: "'Niconne', cursive" }}
              className="text-6xl font-extrabold text-blue-400 ml-4"
            >
              Flavor Food
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4" ref={accountRef}>
            {avatarUrl ? (
              <>
                <button
                  onClick={toggleAccountMenu}
                  className="flex items-center w-10 h-10 rounded-full overflow-hidden border focus:outline-none"
                >
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </button>

                {isAccountOpen && (
                  <div className="absolute right-4 top-20 w-52 bg-white rounded-md shadow-lg z-50">
                    {accountItems.map(({ href, label, icon, onClick }) => (
                      <a
                        key={label}
                        href={href || "#"}
                        onClick={(e) => {
                          if (onClick) {
                            e.preventDefault();
                            onClick();
                          }
                        }}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100"
                      >
                        {icon}
                        {label}
                      </a>
                    ))}

                  </div>
                )}
              </>
            ) : (
              <Link
                to="/sign-in"
                className="px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md font-medium transition"
              >
                Đăng nhập
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 hover:text-blue-900 hover:bg-blue-100"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-6 space-y-2 bg-white border-t border-gray-200">

          <div className="mt-4 border-t border-gray-200 pt-2">
            <p className="text-gray-500 mb-2 font-medium">Tài khoản</p>
            {avatarUrl ? (
              accountItems.map(({ href, label, icon, onClick }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => {
                    if (onClick) {
                      e.preventDefault();
                      onClick();
                    }
                  }}
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-100"
                >
                  {icon}
                  {label}
                </a>
              ))
            ) : (
              <Link
                to="/sign-in"
                className="text-blue-600 hover:underline font-medium"

              >
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default SellerHeader;