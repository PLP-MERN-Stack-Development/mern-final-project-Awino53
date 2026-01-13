import React from "react";
import {Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import CreatePage from "./pages/CreatePage.jsx";  

function App() {
  
  return (
    <Box minH={"100vh"} >
     <Navbar /> 
     <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
       

     </Routes>
       
    </Box>
  );
}

export default App;
