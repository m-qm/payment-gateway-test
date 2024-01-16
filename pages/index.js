// pages/index.js
import { MetaMaskProvider } from '@metamask/sdk-react';
import CreatePayment from './createPayment';

const Home = () => {
  return (
    <MetaMaskProvider debug={true}
      sdkOptions={{
        network: "ropsten",
        infuraId: "f392bd8f2c534d21a1544a409d9aab6c"
      }}
      >
      <CreatePayment />
    </MetaMaskProvider>
  );
};

export default Home;
