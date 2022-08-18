import { Router } from "express";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getUserJobs,
  showStats,
  updateJob,
} from "../controllers/job";

const jobRouter = Router();

jobRouter.route("/").post(createJob).get(getUserJobs);
jobRouter.route("/:id").patch(updateJob).delete(deleteJob);
jobRouter.route("/all").get(getAllJobs);

export default jobRouter;
