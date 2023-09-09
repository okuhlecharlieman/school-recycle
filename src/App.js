import "./index.css";
import AppRouter from "./components/AppRouter";

import { Sepolia } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";

function App() {
  return (
    <ThirdwebProvider
      activeChain={Sepolia}
      clientId="25a829ead24405dd2578f1e875102fdd"
    >
      <AppRouter />
    </ThirdwebProvider>
  )
}

export default App;
