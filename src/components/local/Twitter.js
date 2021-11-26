import React from "react";
import TwitterLogin from "react-twitter-login";

const Twitter = () => {
  const authHandler = (err, data) => {
    console.log(err, data);
  };
  return (
    <TwitterLogin
      authCallback={authHandler}
      consumerKey={"CONSUMER_KEY"}
      consumerSecret={"CONSUMER_SECRET"}
    />
  );
};

export default Twitter;
