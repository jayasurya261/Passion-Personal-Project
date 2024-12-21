import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";

const Video360 = () => {
  const { name } = useParams();
  const videoSrc = decodeURIComponent(name); // Decode the video URL
  console.log("Decoded Video Source:", videoSrc);

  const textureRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Adjust canvas size on window resize
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = videoSrc;

    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;

    // Check if the video is ready to play
    video.oncanplay = () => {
      setVideoReady(true);
      video.play().catch((error) => {
        console.error("Video play error:", error);
      });
    };

    // Create a video texture only when the video is ready
    const texture = new THREE.VideoTexture(video);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.format = THREE.RGBFormat;

    textureRef.current = texture;

    return () => {
      video.pause();
      video.src = "";
    };
  }, [videoSrc]);

  return (
    <div>
      <Link to="/video">
        <motion.button
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group mt-5"
          type="button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="bg-white rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#00000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#00000"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </motion.button>
      </Link>

      {!videoReady && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center z-50">
          <div className="animate-spin h-16 w-16 border-4 border-t-transparent border-white rounded-full"></div>
          <p className="text-white mt-4 text-lg font-semibold">
            Loading 360 Simulator...
          </p>
        </div>
      )}

      {videoReady && (
        <motion.div
          className="w-full h-full absolute top-0 left-0 z-20"
          id="box"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 4, ease: "linear" }}
        >
          <img src="/swipe.jpg" alt="Swipe" />
        </motion.div>
      )}

      <Canvas
        style={{
          width: `${windowDimensions.width}px`,
          height: `${windowDimensions.height}px`,
          position: "absolute", // To ensure it takes the full screen
          top: 0,
          left: 0,
        }}
      >
        <mesh>
          <sphereGeometry args={[500, 60, 40]} />
          {videoReady && textureRef.current && (
            <meshBasicMaterial
              map={textureRef.current}
              side={THREE.BackSide} // Render inside the sphere
            />
          )}
        </mesh>
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default Video360;
