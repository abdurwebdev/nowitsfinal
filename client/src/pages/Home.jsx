import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div>
      <h1>Welcome, {user?.email}!</h1>
      <p>This is the Home Page</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
