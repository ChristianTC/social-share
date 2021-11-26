import React from "react";
import styled from "styled-components";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import axios from "axios";

function LinkedIn() {
  const { linkedInLogin } = useLinkedIn({
    clientId: "86vhj2q7ukf83q",
    redirectUri: `${window.location.origin}/linkedin`,
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
      setErrorMessage("");
      verifyToken(code);
    },
    scope: "r_liteprofile r_emailaddress w_member_social",
    onError: (error) => {
      console.log(error);
      setCode("");
      setErrorMessage(error.errorMessage);
    },
  });
  const [code, setCode] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const verifyToken = (code) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaHJpc3RpYW5AY3cudml0YWxjYXJkLmNvbSIsImV4cCI6MTYzNzI0ODQxMywiaXNzIjoidml0YWxjYXJkIiwiYXVkIjoidml0YWxjYXJkIn0.7eXTHs6l2Z-2ivC0F6ZwXiOmUdifzGid-rKQsPeGul0";
    const headers = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "text/plain",
      },
    };
    const data = {
      Code: code,
      ShareCommentary: "This is a Testing",
      Description: "Hey this is working",
      OriginalUrl: "https://www.vitalcard.com/",
      Title: "VITAL CARD TEST",
    };
    axios
      .post(
        "https://servicesdev.vitalcard.com:8138/Social/LinkedIn/Post",
        data,
        headers
      )
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          setMessage(error.response.data.data.message);
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

  return (
    <Wrapper>
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Log in with Linked In"
        style={{ maxWidth: "180px", cursor: "pointer" }}
      />

      {!code && <div>No code</div>}
      {code && (
        <div>
          <div>Authorization Code: {code}</div>
          <div>Message: {message}</div>
        </div>
      )}
      {errorMessage && <div>{errorMessage}</div>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default LinkedIn;
