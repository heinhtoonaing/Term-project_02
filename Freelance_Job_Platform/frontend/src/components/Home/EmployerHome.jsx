import React from "react";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for routing
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const EmployerHome = () => {
  const details = [
    { id: 1, title: "123,441", subTitle: "Live Jobs", icon: <FaSuitcase /> },
    { id: 2, title: "1,220", subTitle: "Companies", icon: <FaBuilding /> },
    { id: 3, title: "234,200", subTitle: "Job Seekers", icon: <FaUsers /> },
    { id: 4, title: "103,761", subTitle: "Employers", icon: <FaUserPlus /> },
  ];

  return (
    <section className="homePage page">
      <div className="heroSection">
        <div className="container">
          <div className="title">
            <h1>Empower Your Business with Top Talent</h1>
            <h3>Build your dream team today.</h3>
            <p>
              At Career Connect, we make it easy for you to find the right fit
              for your company. Post your job openings, browse through a vast
              pool of skilled professionals, and hire the best candidates to
              take your business to the next level.
            </p>
            {/* Link to the Post Job page */}
            <Link to="/job/post" className="cta-button">
              Post a Job Now
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

export default EmployerHome;
