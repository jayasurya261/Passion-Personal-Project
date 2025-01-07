import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Boxes } from "../ui/Background-boxes";
import { cn } from "../lib/utils";
import { Button } from "../ui/Moving-border";
import { FlipWords } from "../ui/Flip-words";
import { AnimatedTestimonials } from "../ui/Animated-testimonials";
import { InfiniteMoving } from "../ui/Infinite-Moving-Cards";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Link } from "react-router";
import useDeviceType from "../lib/useDeviceType";

const Hero = () => {
  const isMobile = useDeviceType();
  const testimonials = [
    {
      quote:
        "A doctor is a beacon of hope, using knowledge and compassion to restore health and improve lives.",
      name: "Doctor",
      designation: "A doctor heals, cares, and saves.",
      src: "https://img.freepik.com/free-photo/smiling-doctor-with-strethoscope-isolated-grey_651396-974.jpg?t=st=1734599271~exp=1734602871~hmac=7f103244b33d745bb463fcb4dd87dd549055b66c3fc27e9a2309c51b3315fb96&w=1060",
    },
    {
      quote:
        "An engineer transforms ideas into reality, shaping the future with innovation, precision, and creativity.",
      name: "Engineer",
      designation: "An engineer designs, builds, and solves.",
      src: "https://img.freepik.com/free-photo/man-smiling-with-red-helmet-some-blueprints_1187-3172.jpg?t=st=1734599354~exp=1734602954~hmac=1a3fd5b77347f358648ad3639674201352540560685320081481c10fd2db7686&w=900",
    },
    {
      quote:
        "A soldier is the embodiment of unwavering courage, standing steadfast as a guardian of peace, freedom, and enduring honor.",
      name: "Soldier",
      designation: "Valor defines their legacy.",
      src: "https://i.pinimg.com/736x/a5/c4/1a/a5c41acb06bd1d207ef84b3b11577535.jpg",
    },
    {
      quote:
        "A scientist relentlessly seeks truth, pushing boundaries to unravel the mysteries of the universe.",
      name: "Scientist",
      designation: "A scientist explores, experiments, and innovates.",
      src: "https://img.thedailybeast.com/image/upload/c_crop,d_placeholder_euli9k,h_1614,w_2869,x_336,y_0/dpr_1.5/c_limit,w_1044/fl_lossy,q_auto/v1683562768/Screen_Shot_2023-05-08_at_10.49.55_AM_umpnxm",
    },
    {
      quote:
        "A chemist is a master of transformation, unlocking the secrets of matter to create innovations, solutions, and endless possibilities.",
      name: "Chemist",
      designation: "A chemist discovers, transforms, and innovates.",
      src: "https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/bryan-cranston-900x506.jpg",
    },
  ];

  const words = ["Step into tomorrow's work environment.", "Experience the future of productivity.","Innovate, adapt, and redefine possibilities.","Your future workspace starts here."];

  return (
    <div>
      <div className="h-[100vh] relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        <Boxes />
        <h1 className={cn("md:text-[100px] text-xl text-white relative z-20 text-6xl")}>
          PASSION
        </h1>
        <div className="mt-12 flex justify-center items-center px-4">
          <div className="text-4xl mx-auto font-normal text-white dark:text-neutral-400">
            <FlipWords words={words} />
          </div>
        </div>
       
       {isMobile ? (
        <button class="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-500 ease-in-out hover:scale-110 hover:brightness-110 hover:animate-pulse active:animate-bounce mt-10">
        ⚠️ Best viewed on a laptop or desktop for optimal experience.
      </button>
      
      ) : (
        
       <Link to="/video">
        <button className="group relative bg-slate-900 h-16 w-64 border-2 border-teal-600 text-white text-base font-bold rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-emerald-400 hover:text-emerald-300 p-3 text-left before:absolute before:w-10 before:h-10 before:content[''] before:right-2 before:top-2 before:z-10 before:bg-indigo-500 before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-16 after:h-16 after:content[''] after:bg-teal-400 after:right-6 after:top-4 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-10 hover:before:-bottom-4 hover:before:blur hover:after:-right-6 hover:after:scale-110 mt-40">
          Explore More
        </button>
        </Link>
      )}
      
      </div>
      <div className="bg-[#b8b8c2] w-full h-full">
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
      <InfiniteMoving  direction = "left"
     className='font-bold'
     items={[
         {
             quote:
             "+91 8148955789",
             name: "",
             title: "Software Developer",
             img:'https://i2.wp.com/abdominalkey.com/wp-content/uploads/2022/08/f42-01-9780323811996.jpg?w=960'
            },
            {
                quote:
                "suryasunrise261@gmail.com",
                name: "",
                title: "Doctor",
                img:'https://img.freepik.com/premium-photo/soldier-armed-forces-military-war-with-weapon-his-hands-military-special-forces-soldier-generative-ai_1108314-85200.jpg',
            },
            {
                quote:
                "suryasunrise261@gmail.com",
                name: "",
                title: "Chemist",
                img:'https://th.bing.com/th/id/R.e905ed399448403555b57b35b6d1d6a3?rik=nDKLkl2PM%2fYWvg&riu=http%3a%2f%2fwww.ausmotive.com%2fF1%2f2013%2fMonacoGP-78.jpg&ehk=oDDID%2f2q9rFzHZ%2b%2fBdqxfr%2fKo7C1a%2fcmw1ghNi4xKQk%3d&risl=&pid=ImgRaw&r=0'
            },
            
            {
                quote:
                "suryasunrise261@gmail.com",
                name: "",
                title: "Soldier",
                img:'https://www.sydney.edu.au/content/dam/corporate/images/faculty-of-engineering-and-information-technologies/study/pg-c/heroimage-engineering.jpg'
            },
            
        ]}
    />
     <div className="bg-[#b8b8c2] w-full h-full">
     <CardContainer className="inter-var ">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
           Developer
          </CardItem>
          <CardItem
            translateZ="50"
            className="text-2xl font-bold text-neutral-600 dark:text-white"
          >
           JAYASURYA R
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
           Crafting seamless experiences, full-stack developers innovate.
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src="/profile.jpg"
              alt="thumbnail"
              className="h-80 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as={Link}
              to="www.linkedin.com/in/jayasurya-r-b37997279"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Linked In →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Feel free to contact me!
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
     </div>
    </div>
  );
};

export default Hero;
