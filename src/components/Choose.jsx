import React from 'react'
import { HoverEffect } from '../ui/Card-hover-effect'
import { Link } from 'react-router';

const Choose = () => {
    const projects = [
        {
          title: "Doctor",
          description:
            "Lets Check how the Cancer Surgery was done",
          link: "https://stripe.com",
          src:"https://img.freepik.com/free-photo/ordinary-busy-day-surgeon_329181-19717.jpg?t=st=1734605370~exp=1734608970~hmac=ea39862a1f24a5b40be39ea6d78fa83836ac30c210724d1cc88c14d3fbf96b88&w=1060",
          name:"https://res.cloudinary.com/dfrojkr3z/video/upload/v1734714726/Surgery-360_expzog.mp4"
        },
        {
          title: "Engineer",
          description:
            "Lets Check How Factory mechanical engineer works",
          link: "https://netflix.com",
          src:"https://static.toiimg.com/photo/70512247.cms",
           name:"https://res.cloudinary.com/dfrojkr3z/video/upload/v1734714840/ToyotoFactory-360_yjk4gv.mp4"
        },
        {
          title: "Chemist",
          description:
            "Everthing have Bond Lets check how its Exist",
          link: "https://google.com",
          src:"https://www.pharmaceutical.ca/content/uploads/2017/08/CHEMIST-JOB-DESCRIPTION.jpg",
           name:"https://res.cloudinary.com/dfrojkr3z/video/upload/v1734715116/Chemist-360_wnvair.mp4"
        },
        {
          title: "Soldier",
          description:
            "Who Saves nations And Show Power Among them",
          link: "https://meta.com",
          src:"https://img.freepik.com/premium-photo/man-united-states-army-standing-with-holding-sniper-rifle-black-background_398492-4275.jpg",
           name:"https://res.cloudinary.com/dfrojkr3z/video/upload/v1734715012/Part_1_iuztsj.mp4"
        },
        {
          title: "Soldier",
          description:
            "Who Saves nations And Show Power Among them",
          link: "https://meta.com",
          src:"https://i2-prod.irishmirror.ie/incoming/article7416563.ece/ALTERNATES/s1227b/F1-Cars-unveiling-and-winter-testing.jpg",
           name:"https://res.cloudinary.com/dfrojkr3z/video/upload/v1734713331/redbull-360_gq4snw.mp4"
        },
       
       
      ];
  return (
    <div>
        <div className='bg-black text-white flex justify-center items-center text-6xl pt-20'>
            <p>List of Simulators</p>
        </div>
      <div className="mx-auto px-8 bg-black w-full h-full">
      <HoverEffect items={projects} />
    </div>
    <div className='flex justify-center items-center bg-black'>
       <Link to='/'>23.
       <button className='bg-white text-black pr-20 pl-20 p-3 mb-10 rounded-2xl font-bold  hover:animate-bounce'>
                Go Back
        </button>
       </Link>
    </div>
    </div>
  )
}

export default Choose