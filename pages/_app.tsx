import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../components/Navbar";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { avalancheFuji, arbitrum, arbitrumGoerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

//

const { chains, provider, webSocketProvider } = configureChains(
  [arbitrumGoerli, avalancheFuji],
  [publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "Hatch",
  projectId: "12",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Navbar />
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
