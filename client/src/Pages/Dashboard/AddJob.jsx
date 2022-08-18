import Wrapper from "../../Assets/Wrappers/DashboardFormPage";
import { useFormik } from "formik";
import Alert from "../../Components/Alert";
import FormRow, { ReactSelect } from "../../Components/FormRow";
import Ernest from "../../Utils/Ernest";
import useAuthenticate from "../../Hooks/useAuthenticate";
import { useState } from "react";
const AddJob = () => {
  const { auth } = useAuthenticate();
  const [showAlert, setShowAlert] = useState({ show: false });
  const formik = useFormik({
    initialValues: {
      position: "",
      company: "",
      jobLocation: "",
      type: "full-time",
    },
    onSubmit: async (body) => {
      const response = await Ernest("/api/job/", "POST", body, {
        Authorization: `Bearer ${auth.token}`,
      });
      if (!response.error) {
        setShowAlert({
          show: true,
          value: false,
          message: "Add job with succes",
        });
        formik.resetForm();
        setTimeout(() => {
          setShowAlert({ show: false });
        }, 1500);
      } else {
        setShowAlert({
          show: true,
          value: true,
          message: response.error.message,
        });
        setTimeout(() => {
          setShowAlert({ show: false });
        }, 1500);
      }
    },
  });
  return (
    <Wrapper>
      <form className="form" onSubmit={formik.handleSubmit}>
        <h3>{"Add"} Job</h3>
        {showAlert.show && (
          <div style={{ marginTop: "1em" }}>
            <Alert error={showAlert.value} message={showAlert.message} />
          </div>
        )}
        <div className="form-center">
          <FormRow
            type="text"
            label="position"
            onChange={formik.handleChange}
            value={formik.values.position}
            errors={formik.errors.position}
          />
          <FormRow
            type="text"
            label="company"
            onChange={formik.handleChange}
            value={formik.values.company}
            errors={formik.errors.company}
          />
          <FormRow
            type="text"
            label="jobLocation"
            onChange={formik.handleChange}
            value={formik.values.jobLocation}
            errors={formik.errors.jobLocation}
          />
          <ReactSelect
            value={formik.values.type}
            onChange={formik.handleChange}
            label="type"
            enum={[
              ["full-time", "Full Time"],
              ["part-time", "Part Time"],
              ["internship", "Internship"],
              ["remote", "Remote"],
            ]}
          />
          <button type="submit" style={{ marginTop: "0.5em" }} className="btn">
            Add
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
