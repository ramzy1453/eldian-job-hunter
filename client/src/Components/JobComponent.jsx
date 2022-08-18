import React from "react";
import WrapperIC from "../Assets/Wrappers/JobsContainer";
import WrapperJobsInfoDuCalifatIslamique from "../Assets/Wrappers/SearchContainer";
import Wrapper from "../Assets/Wrappers/JobInfo";
import Loading from "./Loading";
import moment from "moment";
import WrapperJob from "../Assets/Wrappers/Job";
import Ernest from "../Utils/Ernest";
import useAuthenticate from "../Hooks/useAuthenticate";
import { FaBriefcase, FaCalendarAlt, FaLocationArrow } from "react-icons/fa";
import FormRow, { ReactSelect } from "./FormRow";
import queryFilter from "../Utils/queryFilter";
export function JobSearch(props) {
  return (
    <WrapperJobsInfoDuCalifatIslamique>
      <form onSubmit={(e) => e.preventDefault()} className="form">
        <h4>Search Form</h4>
        <div className="search-container">
          <div className="big-brother">
            <div className="content-center" style={{ marginRight: "1em" }}>
              <FormRow
                label="search"
                onChange={props.handleChange}
                value={props.values.search}
              />
              <ReactSelect
                value={props.values.type}
                onChange={props.handleChange}
                label="type"
                enum={[
                  ["full-time", "Full Time"],
                  ["part-time", "Part Time"],
                  ["internship", "Internship"],
                  ["remote", "Remote"],
                ]}
              />
            </div>
            <div className="content-center" style={{ marginLeft: "1em" }}>
              <ReactSelect
                value={props.values.status}
                onChange={props.handleChange}
                label="status"
                enum={[
                  ["interview", "Interview"],
                  ["pending", "Pending"],
                  ["declined", "Declined"],
                ]}
              />
              <ReactSelect
                value={props.values.sort}
                onChange={props.handleChange}
                label="sort"
                enum={[
                  ["latest", "Latest"],
                  ["oldest", "Oldest"],
                  ["az", "A-Z"],
                  ["za", "Z-A"],
                ]}
              />
            </div>
          </div>
          <button
            style={{ marginTop: "0.5em" }}
            onClick={props.resetFilter}
            className="btn"
          >
            Reset Filter
          </button>
        </div>
      </form>
    </WrapperJobsInfoDuCalifatIslamique>
  );
}

export function JobContainer(props) {
  const jobs = props.response.data;
  const filteredJobs = jobs && queryFilter(jobs.jobs, props.values);
  if (props.response.isLoading) {
    return <Loading center />;
  }
  if (filteredJobs.length === 0) {
    return (
      <WrapperIC>
        <h4>No jobs to display...</h4>
      </WrapperIC>
    );
  }
  return (
    <WrapperIC>
      <h5>
        {filteredJobs.length} Job{filteredJobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {filteredJobs.map((job) => (
          <Job
            key={job._id}
            all={props.all}
            setState={props.response.setData}
            {...job}
          />
        ))}
      </div>
    </WrapperIC>
  );
}

export function JobInfo(props) {
  return (
    <Wrapper>
      <span className="icon">{props.icon}</span>
      <span className="icon">{props.text}</span>
    </Wrapper>
  );
}
export function Job(props) {
  const { auth } = useAuthenticate();
  return (
    <WrapperJob>
      <header>
        <div className="main-icon">{props.company.charAt(0)}</div>
        <div
          className="info"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <h5>{props.position}</h5>
            <p>{props.company}</p>
          </div>
          <div>
            <h5>{props.owner.username}</h5>
            <p>{props.owner.email}</p>
          </div>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <div>
            <JobInfo icon={<FaLocationArrow />} text={props.jobLocation} />
            <JobInfo
              icon={<FaCalendarAlt />}
              text={moment(props.createdAt).format("MMM Do, YYYY")}
            />
          </div>
          <div>
            <JobInfo icon={<FaBriefcase />} text={props.type} />
            <div className={`status ${props.status}`}>{props.status}</div>
          </div>
        </div>
        <footer>
          {!props.all && (
            <div className="actions">
              <button
                onClick={async () => {
                  const response = await Ernest(
                    `/api/job/${props._id}`,
                    "DELETE",
                    null,
                    {
                      Authorization: `Bearer ${auth.token}`,
                    }
                  );
                  props.setState(response.jobs);
                }}
                type="button"
                className="btn delete-btn"
              >
                Delete
              </button>
            </div>
          )}
        </footer>
      </div>
    </WrapperJob>
  );
}
