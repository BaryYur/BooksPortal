import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth-context";
import { CartContextProvider } from "./context/cart-context";
import { ItemsContextProvider } from "./context/items-context";
import { Provider } from "react-redux";
import store from "./redux-store/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AuthContextProvider>
            <CartContextProvider>
                <ItemsContextProvider>
                    <App />
                </ItemsContextProvider>
            </CartContextProvider>
        </AuthContextProvider>
      </Provider>
    </HashRouter>
  </React.StrictMode>
);