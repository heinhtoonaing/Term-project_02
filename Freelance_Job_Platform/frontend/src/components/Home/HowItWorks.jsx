import React from "react";
import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How Career Connect Works !</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create Account</p>
              <p>
                Create your free account to start exploring job opportunities or
                posting vacancies.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Easily search for job openings or post job listings based on your
                requirements.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply for Jobs/Recruit Candidates</p>
              <p>
                Apply for positions that match your skills or recruit the best
                candidates for your company.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
