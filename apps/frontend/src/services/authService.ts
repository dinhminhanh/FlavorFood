import axiosInstance from "./axiosInstance";

export const logout = async () => {
  try {
    await axiosInstance.post("/auth/logout");

    localStorage.removeItem("access_token");
    sessionStorage.removeItem("access_token");
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    window.location.href = "/sign-in";
  } catch (error) {
    console.error("Đăng xuất thất bại:", error);
  }
};
