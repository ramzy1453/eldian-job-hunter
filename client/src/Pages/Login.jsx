import { useEffect, useState } from "react";
import Wrapper from "../Assets/Wrappers/RegisterPage";
import FormRow from "../Components/FormRow";
import Logo from "../Components/Logo";
import { useFormik } from "formik";
import useAuthenticate from "../Hooks/useAuthenticate";
import Ernest from "../Utils/Ernest";
import * as Yup from "yup";
import Alert from "../Components/Alert";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setAuth, auth } = useAuthenticate();
  const [error, setError] = useState({ show: false });
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    }
  }, [auth, navigate]);

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .required("Email is required")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Email must be respect it's regex"
        ),
      password: Yup.string().trim().required("Password is required"),
    }),
    onSubmit: async (body) => {
      const response = await Ernest("/api/auth/login", "POST", body);
      if (!response.error) {
        const { user, token } = response;
        setAuth({ user, token, location: "Ancient Wano" });
        setError({
          show: true,
          value: false,
          message: "Succesful regisration! ... redirecting",
        });
      } else {
        setError({
          show: true,
          value: true,
          message: response.error.message,
        });
      }
    },
  });

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: "1.5em" }}>
          <Logo />
        </div>
        <h3>Login</h3>
        {error.show && <Alert error={error.value} message={error.message} />}
        <FormRow
          type="text"
          label="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          errors={formik.errors.email}
        />
        <FormRow
          type="password"
          label="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          errors={formik.errors.password}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Not a member yet ?
          <button type="button" onClick={goToRegister} className="member-btn">
            Register
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Login;
