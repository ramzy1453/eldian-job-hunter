import React from "react";
import { JobContainer, JobSearch } from "../../Components/JobComponent";
import useErnest from "../../Hooks/useErnest";
import useAuthenticate from "../../Hooks/useAuthenticate";
import { useFormik } from "formik";

export default function Jobs({ all }) {
  const { auth } = useAuthenticate();
  const type = all ? "all" : "";
  const response = useErnest(`/api/job/${type}`, {
    Authorization: `Bearer ${auth.token}`,
  });

  const formik = useFormik({
    initialValues: {
      search: "",
      status: "interview",
      type: "full-time",
      sort: "latest",
    },
  });
  return (
    <>
      <JobSearch
        values={formik.values}
        resetFilter={formik.resetForm}
        handleChange={formik.handleChange}
      />
      <JobContainer response={response} all={all} values={formik.values} />
    </>
  );
}
