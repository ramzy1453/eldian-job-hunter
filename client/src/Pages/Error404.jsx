import image from "../Assets/Images/not-found.svg";
import Wrapper from "../Assets/Wrappers/ErrorPage";
import { Link } from "react-router-dom";
const Error404 = () => {
  return (
    <Wrapper>
      <img alt="error" src={image} />
      <h3>{"It seems that this page don't exist :/"}</h3>
      <p>{"We can't seem to find the page you're looking for"}</p>
      <Link to="/" className="btn btn-error">
        back home
      </Link>
    </Wrapper>
  );
};

export default Error404;
