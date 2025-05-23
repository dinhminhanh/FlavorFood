import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, FileText, Lightbulb, Settings, LogOut, Menu, Store } from "lucide-react";
import { useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

const AdminSidebar: React.FC<{ setActivePage: (page: string) => void }> = ({ setActivePage }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const fontStyle = document.createElement('style');
  fontStyle.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Niconne&display=swap');
`;
  document.head.appendChild(fontStyle);
  const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {}, {});

      navigate("/admin/login");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };


  const menuItems = [
    { to: "/admin/accounts", icon: <Users className="w-5 h-5" />, label: "Quản lý tài khoản" },
    { to: "/admin/posts", icon: <FileText className="w-5 h-5" />, label: "Quản lý công thức" },
    { to: "/admin/tips", icon: <Lightbulb className="w-5 h-5" />, label: "Quản lý mẹo vặt" },
    { to: "/admin/stores", icon: <Store className="w-5 h-5" />, label: "Quản lý cửa hàng " },
  ];

  const handlePageChange = (label: string) => {
    setActivePage(label);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 p-2 rounded-md text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-blue-100 p-6 flex flex-col transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-64"
          } md:relative md:translate-x-0`}
      >
        <div className="flex items-center space-x-4">
          <span
            style={{ fontFamily: "'Niconne', cursive" }}
            className="text-4xl font-bold text-blue-700 "
          >
            Flavor Food
          </span>
        </div>

        <nav className="space-y-4 mt-6">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => handlePageChange(item.label)}
                className={`flex items-center space-x-2 py-2 px-4 rounded-lg w-full text-left transition ${isActive ? "bg-blue-700 font-bold text-white" : "hover:bg-blue-500"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto">
          <button
            className="flex items-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" /> Đăng xuất
          </button>
        </div>
      </aside>

      {isOpen && (
        <div className="fixed inset-0 bg-black opacity-50 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}
    </>
  );
};

export default AdminSidebar;
