import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  // Metamask is available
  window.ethereum.enable(); // Request account access

  web3 = new Web3(window.ethereum);
} else {
  // Fallback to a different provider (e.g., Infura)
  const provider = new Web3.providers.HttpProvider(
    'https://mainnet.infura.io/v3/'
  );
  web3 = new Web3(provider);
}

export default web3;