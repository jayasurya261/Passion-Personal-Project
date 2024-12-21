import React, { useState, useEffect } from "react";
import { HoverEffect } from "../ui/Card-hover-effect";
import { Link } from "react-router";

const Choose = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const projects = [
    {
      title: "Doctor",
      description: "Lets Check how the Cancer Surgery was done",
      link: "https://stripe.com",
      src: "https://chspecialists.org/wp-content/uploads/2023/02/What-Qualifies-as-Major-or-Minor-Surgery.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734714726/Surgery-360_expzog.mp4",
    },
    {
      title: "Engineer",
      description: "Lets Check How Factory mechanical engineer works",
      link: "https://netflix.com",
      src: "https://static.toiimg.com/photo/70512247.cms",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734714840/ToyotoFactory-360_yjk4gv.mp4",
    },
    {
      title: "Chemist",
      description: "Everthing have Bond Lets check how its Exist",
      link: "https://google.com",
      src: "https://www.pharmaceutical.ca/content/uploads/2017/08/CHEMIST-JOB-DESCRIPTION.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734715116/Chemist-360_wnvair.mp4",
    },
    {
      title: "Soldier",
      description: "Who Saves nations And Show Power Among them",
      link: "https://meta.com",
      src: "https://img.freepik.com/premium-photo/man-united-states-army-standing-with-holding-sniper-rifle-black-background_398492-4275.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734715012/Part_1_iuztsj.mp4",
    },
    {
      title: "Soldier",
      description: "Who Saves nations And Show Power Among them",
      link: "https://meta.com",
      src: "https://i2-prod.irishmirror.ie/incoming/article7416563.ece/ALTERNATES/s1227b/F1-Cars-unveiling-and-winter-testing.jpg",
      name: "https://res.cloudinary.com/dfrojkr3z/video/upload/v1734713331/redbull-360_gq4snw.mp4",
    },
  ];

  useEffect(() => {
    // Simulating loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen bg-black">
          {/* Tailwind Spinner */}
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        </div>
      ) : (
        <div>
          <div className="bg-black text-white flex justify-center items-center text-6xl pt-20">
            <p>List of Simulators</p>
          </div>
          <div className="mx-auto px-8 bg-black w-full h-full">
            <HoverEffect items={projects} />
          </div>
          <div className="flex justify-center items-center bg-black">
            <Link to="/">
              <button className="bg-white text-black pr-20 pl-20 p-3 mb-10 rounded-2xl font-bold hover:animate-bounce">
                Go Back
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Choose;
