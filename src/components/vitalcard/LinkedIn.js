import React from "react";
import styled from "styled-components";
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import axios from "axios";

function LinkedIn() {
  const [code, setCode] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjaHJpc3RpYW5AY3cudml0YWxjYXJkLmNvbSIsImV4cCI6MTYzNzk1MTAzNiwiaXNzIjoidml0YWxjYXJkIiwiYXVkIjoidml0YWxjYXJkIn0.C4zVEcgUKLHd5Cjt2C_8f2MUWGq2eixOlR73dmsv_og";
  const HEADERS = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  };

  const accessToken =
    "AQTlHK2op6hzDPjhkR9zVzvqkSOaEx6lbWlCnQuduGdDXnOE7Q1uu_VnwBEv2rZ7Klq5FFzhxcULNY5u0WqmWxMb2Fu02V8bhdyYizZwgOpRE494TadHN3KbiX1RWLyun4_C32o4Qnz7Lmbc8YJhexaULzwTTiIJeBNACMGp_Ww6iV036L-DQNZwKxZ5_HyW2XFhSwySLohukdsWToQ";

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

  const verifyToken = (code) => {
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
        HEADERS
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

  return (
    <Wrapper>
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Log in with Linked In"
        style={{ maxWidth: "180px", cursor: "pointer" }}
      />

      {!code && (
        <div>
          <div>No code</div>
          <button type="submit" onClick={() => verifyToken(accessToken)}>
            Verify Token
          </button>
        </div>
      )}
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

export default LinkedIn;
