import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AddBook from "./pages/AddBook";
import '../src/assets/sass/main.scss'
import Explore from "./pages/Explore";
import ListBook from "./pages/ListBook";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<Explore/>} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="addbook" element={<AddBook />} />
          <Route path="booklist" element={<ListBook/>}/>
        </Route>
        <Route path="*" element={<b>Tapaile Khojnuvako page Vetiyena</b>}/>
      </Routes>
    </Router>
  );
};

export default App;
