import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for routing
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const JobSeekerHome = () => {
  const details = [
    { id: 1, title: "123,441", subTitle: "Available Jobs", icon: <FaSuitcase /> },
    { id: 2, title: "1,220", subTitle: "Hiring Companies", icon: <FaBuilding /> },
    { id: 3, title: "234,200", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "103,761", subTitle: "Employers", icon: <FaUserPlus /> },
  ];

  return (
    <section className="homePage page">
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Find Your Dream Job Today</h1>
            <h3>Discover exciting opportunities and grow your career.</h3>
            <p>
              At Career Connect, we help you connect with top employers and
              discover job opportunities that match your skills and experience.
              Browse thousands of job listings and apply with ease.
            </p>
            {/* Link to the All Jobs page */}
            <Link to="/job/getall" className="cta-button">
              Explore Jobs
            </Link>
          </div>
          <div className="image">
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
        <div className="details">
          {details.map((detail) => (
            <div className="card" key={detail.id}>
              <div className="icon">{detail.icon}</div>
              <div className="content">
                <p>{detail.title}</p>
                <p>{detail.subTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reusing common components */}
      <HowItWorks />
      <PopularCategories />
      <PopularCompanies />
    </section>
  );
};

export default JobSeekerHome;
