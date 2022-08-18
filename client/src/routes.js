import { Navigate, useRoutes } from "react-router-dom";
import DashboardLayout from "./Pages/Dashboard/DashboardLayout";
import Landing from "./Pages/Landing";
import Register from "./Pages/Register";
import Error404 from "./Pages/Error404";
import Login from "./Pages/Login";
import Users from "./Pages/Dashboard/Users";
import Jobs from "./Pages/Dashboard/Jobs";
import Profile from "./Pages/Dashboard/Profile";
import AddJob from "./Pages/Dashboard/AddJob";
import ProtectedRoute from "./Components/ProtectedRoute";

export default function Router() {
  return useRoutes([
    {
      path: "/landing",
      element: <Landing />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Navigate to="landing" />,
    },
    {
      path: "/dashboard/",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "my-jobs",
          element: <Jobs all={false} />,
        },
        {
          path: "jobs",
          element: <Jobs all={true} />,
        },
        {
          path: "add-job",
          element: <AddJob />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "",
          element: <Navigate to="profile" />,
        },
      ],
    },
    {
      path: "*",
      element: <Error404 />,
    },
  ]);
}
