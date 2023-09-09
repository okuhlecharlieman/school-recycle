import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import "./styles/globals.css";
import { Sepolia } from "@thirdweb-dev/chains";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="25a829ead24405dd2578f1e875102fdd"
    >
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);