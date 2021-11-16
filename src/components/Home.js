import React from "react";
import FacebookInPage from "./FacebookInPage";
// import { LinkedIn } from "react-linkedin-login-oauth2";
// import LinkedInPage from "./LinkedInPage";
import TwitterInPage from "./TwitterInPage";

import LinkedIn from "./testComponents/LinkedIn";

const Home = () => {
  return (
    <div>
      HOME
      <LinkedIn />
      <FacebookInPage />
      <TwitterInPage />
    </div>
  );
};

export default Home;
