/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // lOAD THE AUTHENTICATED USER
  const { isLoading, isAuthenticated } = useUser();

  // IF NO AUTHENTICATE USER REDIRECT TO THE LOGIN PAGE
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isLoading, navigate, isAuthenticated]);

  // SHOW A LOADING SPINNER
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // IF THERE IS AUTHENTICATION RENDER THE APP
  if(isAuthenticated)return children;
}

export default ProtectedRoute;
