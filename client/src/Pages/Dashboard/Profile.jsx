import useAuthenticate from "../../Hooks/useAuthenticate";
import { useFormik } from "formik";
import Wrapper from "../../Assets/Wrappers/DashboardFormPage";
import FormRow from "../../Components/FormRow";
import * as Yup from "yup";
import { useState } from "react";
import BiographyModal from "../../Components/BiographyModal";
import Ernest from "../../Utils/Ernest";
import Alert from "../../Components/Alert";
import ImageReader from "../../Components/ImageReader";
export default function Profile() {
  const { auth, setAuth } = useAuthenticate();
  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      username: auth.user.username,
      email: auth.user.email,
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
    }),
    onSubmit: async (body) => {
      const response = await Ernest("/api/auth/login", "PATCH", body, {
        Authorization: `Bearer ${auth.token}`,
      });
      if (!response.error) {
        const { user, token } = response;
        setAuth({ user, token });
        setShowAlert({ show: true, value: false, message: "Succesful Update" });
        setTimeout(() => {
          setShowAlert({ show: false });
        }, 1500);
      } else {
        setShowAlert({
          show: true,
          value: true,
          message: response.error.message.includes("username")
            ? "Username already picked"
            : response.error.message,
        });
        setTimeout(() => {
          setShowAlert({ show: false });
        }, 1500);
      }
    },
  });

  const [isModalOpen, setModalOpen] = useState(false);
  const [isImageOpen, setImageOpen] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false });
  return (
    <Wrapper>
      <BiographyModal
        aboutme={auth.user.aboutme}
        isOpen={isModalOpen}
        closeModal={() => setModalOpen(false)}
      />
      <ImageReader
        isOpen={isImageOpen}
        closeModal={() => setImageOpen(false)}
      />
      <div className="image-wrapper">
        <img alt="" src={auth.user.image} />
        <button onClick={() => setImageOpen(true)} className="btn">
          Update Picture
        </button>
        <button onClick={() => setModalOpen(true)} className="btn btn-bio">
          Set Biography
        </button>
        <div style={{ marginTop: "0.6em", textAlign: "center" }}>
          Joined the {new Date(auth.user.createdAt).toLocaleDateString()}
        </div>
        <div style={{ textAlign: "center" }}>{auth.user.location}</div>
      </div>
      <div className="informations">
        <div className="first">
          {showAlert.show && (
            <div style={{ marginTop: "1em" }}>
              <Alert error={showAlert.value} message={showAlert.message} />
            </div>
          )}
          <div className="name">{auth.user.username}</div>
          <div className="about-me">{auth.user.aboutme}</div>
        </div>
        <div className="second">
          <form onSubmit={formik.handleSubmit}>
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

            <button
              style={{
                marginTop: "0.5em",
              }}
              className="btn"
              type="submit"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}
