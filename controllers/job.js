import Job from "../models/job";
import { BadRequestErrorAPI, NotFoundErrorAPI } from "../errors/errorAPI";
import { StatusCodes } from "http-status-codes";

export const createJob = async (req, res) => {
  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequestErrorAPI("Provide all values please!");
  }
  req.body.owner = req.user.userID;
  const { jobLocation, owner, type, status } = req.body;
  const job = await Job.create({
    owner,
    position,
    company,
    type,
    status,
    jobLocation,
  });
  res.status(StatusCodes.CREATED).json({ created: true, job });
};
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({}).populate("owner");
  res.status(StatusCodes.OK).json({
    jobs: jobs,
    totalJobs: jobs.length,
    numOfPage: 1,
  });
};
export const getUserJobs = async (req, res) => {
  const owner = req.user.userID;
  const jobs = await Job.find({ owner }).populate("owner");
  res.status(StatusCodes.OK).json({
    jobs: jobs,
    totalJobs: jobs.length,
    numOfPage: 1,
  });
};

export const deleteJob = async (req, res) => {
  const { userID: owner } = req.user;
  const { id: _id } = req.params;
  const job = await Job.deleteOne({ _id, owner });
  if (!job.deletedCount) {
    throw new NotFoundErrorAPI("Can not delete a non existant job");
  }
  const jobs = await Job.find({ owner });
  res.status(StatusCodes.OK).json({
    message: "Deleted with succes",
    jobs: {
      jobs: jobs,
      totalJobs: jobs.length,
      numOfPage: 1,
    },
  });
};

export const updateJob = async (req, res) => {
  const { userID: owner } = req.user;
  const { id: _id } = req.params;

  const job = await Job.findOneAndUpdate({ owner, _id }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    throw new NotFoundErrorAPI("Can not update a non existant job");
  }
  res.status(StatusCodes.OK).json({ job });
};
export const showStats = async (req, res) => {};
