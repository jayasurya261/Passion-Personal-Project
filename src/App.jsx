import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { BrowserRouter, Route , Routes } from "react-router";
import Hero from "./components/Hero";
import Video360 from "./components/Video360";
import Choose from "./components/Choose";
import AI from "./components/AI";
import AIHeroPage from "./components/AiPage";
import ChatAnalytics from "./components/Analytics";
import MCQGame from "./components/Mcq";
import AIConversationGenerator from "./components/Speak";
import DiagramGenerator from "./components/Diagram";



const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path = '/' element={<Hero/>}/>
      <Route path = '/video/:name' element={<Video360/>}/>
      <Route path = '/video' element={<Choose/>}/>
      <Route path = '/ai' element={<AI/>}/>
      <Route path = '/ai-page' element={<AIHeroPage/>}/>
      <Route path = '/insight' element={<ChatAnalytics/>}/>
      <Route path = '/game' element={<MCQGame/>}/>
      <Route path = '/speak' element={<AIConversationGenerator/>}/>
      <Route path = '/diagram' element={<DiagramGenerator/>}/>
    </Routes>
   </BrowserRouter>
  );
};

export default App;
