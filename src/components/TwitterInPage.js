import React from "react";
import axios from "axios";
// import addOAuthInterceptor from "axios-oauth-1.0a";
// import TwitterLogin from "react-twitter-login";

// const CONSUMER_KEY = "RTolv8eCRtxGXnLHXtPdoC2Ao";
// const oauth_token = "ogZVzAAAAAABVkH2AAABfQuhOM8";
const TwitterInPage = () => {
  const makePost = () => {
    login();
    // redirectToTwitter("YWuz-gAAAAABVkH2AAABfSlZ24I");
    // verify();
  };
  const redirectToTwitter = (auth_url) => {
    window.location.href = `https://api.twitter.com/oauth/authorize?oauth_token=${auth_url}`;
  };
  // const redirectToTwitter = (auth_url) => {

  const login = () => {
    axios
      .post(
        "https://api.twitter.com/oauth/request_token?oauth_consumer_key=RTolv8eCRtxGXnLHXtPdoC2Ao",
        {},
        {
          headers: {
            Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAPZBVgEAAAAA5vs2%2Bm7rDK%2Fev%2FYn96Cl9O7%2Fff4%3Dx8ASpldMlyMZFKUyTAO3JZuQYrclDleVPJorUgfnto3dFmFJTw`,
            "Content-Type": "text/plain",
          },
        }
      )
      .then((response) => console.log(response));
  };

  return <div onClick={makePost}>Login with Twitter</div>;
};

export default TwitterInPage;
