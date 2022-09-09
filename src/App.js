import React, { useState } from 'react';
import Home from './pages/Home'
import { Routes, Route, useNavigate } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";

import './App.css';

function App() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = "/search";
    navigate(path);
  }

const [query, setquery] = useState("");
const search = (query) => {

}

  return (
  <>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          {/* <Route path="/search" element={<Search />} /> */}

      </Routes>
  </>
  );
}




export default App;
