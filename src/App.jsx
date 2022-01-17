import { useEffect, useState } from "react";
import { ethers } from "ethers";

import contractABI from "./PepsiABI.json";

const contractAddress = "0x54b97b0afd85d7c619d3ec078ba11a069a85f41b";

const { ethereum } = window;

const getPepsiContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const pepsiContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return pepsiContract;
};

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [totalSupply, setTotalSupply] = useState("");

  useEffect(() => {
    isWalletIsAvailable();
    isPepsiContractExists();
  }, []);

  const isWalletIsAvailable = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectToCurrentAccount = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const isPepsiContractExists = async () => {
    try {
      if (ethereum) {
        const pepsiContract = getPepsiContract();
        const totalSupply = await pepsiContract.totalSupply();

        setTotalSupply(totalSupply.toString());
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  return (
    <>
      <button onClick={connectToCurrentAccount}>Click me</button>
      <h3>{currentAccount}</h3>
      <h3>Total Supply : {totalSupply}</h3>
    </>
  );
}

export default App;
