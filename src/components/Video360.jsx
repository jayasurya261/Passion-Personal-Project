import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Link, useParams } from "react-router";

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
        <button
          className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
          type="button"
        >
          <div
            className="bg-black rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#fff"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#fff"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>
      </Link>
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