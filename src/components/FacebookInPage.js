import React from "react";
import FacebookLogin from "react-facebook-login";
// import ShareLink from "react-facebook-share-link";
import axios from "axios";

const FacebookInPage = () => {
  const [code, setCode] = React.useState("");

  const responseFacebook = (response) => {
    console.log(response);
    console.log(response.accessToken);
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://www.vitalcard.com/u/E003554",
      "_blank"
    );
    setCode(response.accessToken);
    console.log("newCode>> " + code);
    console.log("response " + response.accessToken);
    axios
      .post(
        "https://services.vitalcard.com:8138/Social/Facebook/Post",
        { AccessToken: response.accessToken },
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJub3VyQHZpdGFsY2FyZC5jb20iLCJleHAiOjE2MzcwOTEyMTUsImlzcyI6InZpdGFsY2FyZCIsImF1ZCI6InZpdGFsY2FyZCJ9.bX0JI1xuwulP-FGiYtAM22dv09rFSe0KIO5pe4oliNI`,
            "Content-Type": "application/json",
          },
        }
      )
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
  };
  const verifyToken = (code) => {};
  // const subject = "Join VITAL Card!";
  // const text = "Vital Card is awesome";
  return (
    <div>
      <FacebookLogin
        appId="1160688057733805"
        // appId="624588341876714"
        autoLoad={false}
        fields="name,email,picture"
        // onClick={componentClicked}
        callback={responseFacebook}
        scope="public_profile, email, user_posts"
      ></FacebookLogin>
    </div>
  );
};

export default FacebookInPage;
