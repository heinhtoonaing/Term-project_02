import React, { useContext } from "react";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import JobSeekerHome from "./JobSeekerHome";
import EmployerHome from "./EmployerHome";

const Home = () => {
  const { isAuthorized, user } = useContext(Context);
  
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  // Conditional rendering based on user role
  if (user && user.role === "Employer") {
    return <EmployerHome />;
  } else {
    return <JobSeekerHome />;
  }
};

export default Home;
