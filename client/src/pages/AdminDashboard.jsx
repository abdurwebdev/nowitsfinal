import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
