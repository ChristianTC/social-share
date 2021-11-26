import React from "react";
import FacebookLogin from "react-facebook-login";
// import ShareLink from "react-facebook-share-link";
import axios from "axios";

const Facebook = () => {
  // const [code, setCode] = React.useState("");
  const codePrimary = "E280799";
  const authToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaHJpc3RpYW5AY3cudml0YWxjYXJkLmNvbSIsImV4cCI6MTYzNzc3NDUyOCwiaXNzIjoidml0YWxjYXJkIiwiYXVkIjoidml0YWxjYXJkIn0.7puZaRLsw-9nj8wqkyK6r6n5N6ije5N4MvdpyaaBg3o";

  const sharePost = (response) => {
    const ventana = window.open(
      `https://www.facebook.com/sharer/sharer.php?u=https://www.vitalcard.com/u/${codePrimary}`,
      "_blank",
      "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400"
    );
    let interval = setInterval(function () {
      //Comprobamos que la ventana no este cerrada
      if (ventana.closed !== false) {
        //Si la ventana ha sido cerrada, limpiamos el contador
        window.clearInterval(interval);
        console.log("response " + response.accessToken);
        verifyPost(response);
      }
    }, 1000);
  };

  const responseFacebook = (response) => {
    console.log(response);
    console.log(response.accessToken);
    // window.open(
    //   "https://www.facebook.com/sharer/sharer.php?u=https://www.vitalcard.com/u/E280799",
    //   "_blank"
    // );
    console.log("response " + response.accessToken);
    sharePost(response);
  };

  const verifyPost = (response) => {
    axios
      .post(
        "https://servicesdev.vitalcard.com:8138/Social/Facebook/Post",
        { AccessToken: response.accessToken },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => console.log(response))
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
  // const subject = "Join VITAL Card!";
  // const text = "Vital Card is awesome";
  return (
    <div>
      <FacebookLogin
        // appId="584981019476208"
        fields="name,email,picture"
        appId="387463516359855"
        autoLoad={false}
        scope="public_profile, email, user_posts"
        returnScopes={true}
        // onClick={sharePost}
        callback={responseFacebook}
      ></FacebookLogin>
    </div>
  );
};

export default Facebook;
