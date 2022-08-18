import { jobActions } from "../Store/job";
import { useDispatch, useSelector } from "react-redux";

export default function useJob() {
  const job = useSelector((state) => state.job);
  const dispatch = useDispatch();

  return {
    job,
    setJobs: (jobs) => dispatch(jobActions.setJobs(jobs)),
    updateJob: (action) => dispatch(jobActions.setAuth()),
    removeJob: (action) => dispatch(jobActions.setAuth()),
  };
}
