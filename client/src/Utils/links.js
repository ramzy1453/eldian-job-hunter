import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile, ImUsers } from "react-icons/im";
const links = [
  {
    id: 1,
    text: "jobs",
    path: "jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 2,
    text: "add job",
    path: "add-job",
    icon: <FaWpforms />,
  },
  {
    id: 3,
    text: "my jobs",
    path: "my-jobs",
    icon: <IoBarChartSharp />,
  },
  {
    id: 4,
    text: "users",
    path: "users",
    icon: <ImUsers />,
  },

  {
    id: 5,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
];

export default links;
