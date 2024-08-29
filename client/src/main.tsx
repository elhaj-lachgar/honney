import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import CardContextProvider from "./context/CardContextProvider.tsx";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import WishListContextProvider from "./context/WishListContextProvider.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthContextProvider from "./context/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <GoogleOAuthProvider clientId="306990860718-s4eapso2pq7luh19u41hdv46o6bclihe.apps.googleusercontent.com">
          <CardContextProvider>
            <WishListContextProvider>
              <ChakraProvider>
                <App />
              </ChakraProvider>
            </WishListContextProvider>
          </CardContextProvider>
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
