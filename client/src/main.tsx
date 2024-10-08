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
import CategoryContextProvider from "./context/CategoryContextProvider.tsx";
import ProductNameContext from "./context/ProductNameContext.tsx";
import AddressContextProvider from "./context/AddressContextProvider.tsx";
import HomeProductContextProvider from "./context/HomeProductContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <GoogleOAuthProvider
          clientId={
            "306990860718-s4eapso2pq7luh19u41hdv46o6bclihe.apps.googleusercontent.com"
          }
        >
          <CardContextProvider>
            <WishListContextProvider>
              <ChakraProvider>
                <CategoryContextProvider>
                  <ProductNameContext>
                    <AddressContextProvider>
                      <HomeProductContextProvider>
                        <App />
                      </HomeProductContextProvider>
                    </AddressContextProvider>
                  </ProductNameContext>
                </CategoryContextProvider>
              </ChakraProvider>
            </WishListContextProvider>
          </CardContextProvider>
        </GoogleOAuthProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
