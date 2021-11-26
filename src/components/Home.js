import React from "react";
// import FacebookInPage from "./vitalcard/FacebookInPage";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/local">LOCAL</Link>
      <br />
      <Link to="/vitalcard">VITAL CARD</Link>
    </div>
  );
};

export default Home;
