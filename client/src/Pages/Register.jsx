import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../Hooks/useAuthenticate";
import Wrapper from "../Assets/Wrappers/RegisterPage";
import FormRow from "../Components/FormRow";
import Logo from "../Components/Logo";
import Ernest from "../Utils/Ernest";
import Alert from "../Components/Alert";
import * as Yup from "yup";

const Register = () => {
  const navigate = useNavigate();
  const { setAuth, auth } = useAuthenticate();
  const [error, setError] = useState({ show: false });

  useEffect(() => {
    if (auth.user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    }
  }, [auth, navigate]);

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      username: "",
      email: "",
      password: "",
      "confirm password": "",
    },
    validationSchema: Yup.object({
      username: Yup.string().trim().required("Username is required"),
      email: Yup.string()
        .trim()
        .required("Email is required")
        .matches(
          /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Email must be respect it's regex"
        ),
      password: Yup.string()
        .trim()
        .required("Password is required")
        .min(8, "Your password mustn't be under 8 characters"),
      "confirm password": Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null], "Passwords don't match"),
    }),
    onSubmit: async (body) => {
      const response = await Ernest("/api/auth/register", "POST", {
        username: body.username,
        email: body.email,
        password: body.password,
      });
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

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={formik.handleSubmit}>
        <div style={{ marginBottom: "1.5em" }}>
          <Logo />
        </div>
        <h3>Register</h3>
        {error.show && <Alert error={error.value} message={error.message} />}
        <FormRow
          type="text"
          label="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          errors={formik.errors.username}
        />
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
        <FormRow
          type="password"
          label="confirm password"
          onChange={formik.handleChange}
          value={formik.values["confirm password"]}
          errors={formik.errors["confirm password"]}
        />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member ?
          <button type="button" onClick={goToLogin} className="member-btn">
            Login
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
