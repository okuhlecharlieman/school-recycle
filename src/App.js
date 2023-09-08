import "./index.css";
import AppRouter from "./components/AppRouter";

import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider, useContract } from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="25a829ead24405dd2578f1e875102fdd"
    >
      <Component />
      <AppRouter />
    </ThirdwebProvider>
  )
}

function Component() {
  const { contract, isLoading } = useContract("0xd6f7113551358EE1e20b5004F7EDA2f78723042e");
}

export default App;
