import { useNavigate } from "react-router-dom";
import main from "../Assets/Images/main.png";
import Wrapper from "../Assets/Wrappers/LandingPage";
import Logo from "../Components/Logo";
const Landing = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Eldian <span>Job</span> Hunter
          </h1>
          <p>
            {`the goal of Eldian Job Hunter is connecting job seekers with the companies they want to work for. You may not know us, but we've been around awhile.
             giving them free access to search for jobs,
            post resumes, and research companies. Every day, with a lot of new opportunities.
          `}
          </p>
          <button onClick={() => navigate("/login")} className="btn btn-hero">
            Login/Register
          </button>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
