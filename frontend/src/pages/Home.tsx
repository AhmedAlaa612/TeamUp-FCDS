import { useNavigate } from "react-router";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="home">
      <div className="main-text">
        <h1 className="arc">TeamConnect</h1>
        <p>Kickstart your innovation journey with the right team</p>
        <button className="join-btn" onClick={() => navigate("/teams")}>
          Join a Team
        </button>
      </div>
    </div>
  );
}

export default Home;
