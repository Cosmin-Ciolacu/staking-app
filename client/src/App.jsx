import Container from "@mui/material/Container"
import Button from "@mui/material/Button"
import { useState, useEffect } from "react"
import Web3 from "web3"
import "./App.css"
import StakingContractArtifacts from "./abi/StakingContract.json"

const web3 = new Web3(Web3.givenProvider)

const App = () => {
  const [account, setAccount] = useState(null)
  useEffect(() => {
    (async () => {
      const { ethereum } = window;
     if (!isMetaMaskInstalled()) {
       alert("metamask must be installed");
       return;
     }
     const accounts = await ethereum.request({ method: 'eth_accounts' });
     if (accounts && accounts[0]) {
       const formatedAccount = `${accounts[0].substring(0, 8)}...`
     setAccount(formatedAccount)
     }
    })()
  }, [])

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
     if (!ethereum || !ethereum.isMetaMask) {
       return false;
     }
     return true;
  }
  const connectToWallet = async () => {
    //
     const { ethereum } = window;
     if (!isMetaMaskInstalled()) {
       alert("metamask must be installed");
       return;
     }
     console.log("connecting...")
     const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
     console.log(accounts)
     const formatedAccount = `${accounts[0].substring(0, 8)}...`
     setAccount(formatedAccount)
  }
  return (
    <Container>
      <div className="nav">
        <h1>Staking app</h1>
        <h1>Account: {account}</h1>
      </div>
      <Button variant="contained" onClick={() => connectToWallet()} fullWidth>{account === null ? "Connect wallet" : "Disconnect wallet"}</Button>
    </Container>
  )
}

export default App;