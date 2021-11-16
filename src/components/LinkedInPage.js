import React from "react";
import styled from "styled-components";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import axios from "axios";

function LinkedInPage() {
  const { linkedInLogin } = useLinkedIn({
    clientId: "77ouhfcvuzq5so",
    redirectUri: `https://www.vitalcard.com`,
    scope: "r_liteprofile r_emailaddress w_member_social",
    onSuccess: (code) => {
      console.log(code);
      setCode(code);
      setErrorMessage("");
      verifyToken(code);
    },
    onError: (error) => {
      console.log(error);
      setCode("");
      setErrorMessage(error.errorMessage);
    },
  });
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const verifyToken = (code) => {
    const headers = {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2dDc0MnV0NWFAdml0YWxjYXJkLnh5eiIsImV4cCI6MTYzNzA4MTg4NCwiaXNzIjoidml0YWxjYXJkIiwiYXVkIjoidml0YWxjYXJkIn0.0hIBwkfgEec6Fk0D3PQ_NDhlvDZX0bM90L9kyw640PM`,
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
        "https://services-staging.vitalcard.com:8138/Social/LinkedIn/Post",
        data,
        headers
      )
      .then((response) => console.log(response));
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

export default LinkedInPage;
