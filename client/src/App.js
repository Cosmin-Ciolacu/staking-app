import { TextField, Button, Container } from "@mui/material"
import { useState, useEffect } from "react"
import { ContractService } from "./services/ContractService"
import "./App.css"

const contractService = new ContractService();

const App = () => {
  const [account, setAccount] = useState(null)
  const [stake, setStake] = useState(0)
  const [totalStake, setTotalStake] = useState(null)
  useEffect(() => {
    (async () => {
      const { ethereum } = window;
     if (!isMetaMaskInstalled()) {
       alert("metamask must be installed");
       return;
     }
     const accounts = await ethereum.request({ method: 'eth_accounts' });
     if (accounts && accounts[0]) {
       //const gas = await StakingContract.methods.addStakeHolder(accounts[0]).estimatedGas();
      //  const res = await StakingContract.methods.addStakeHolder(accounts[0]).call((err, result) => {
      //    if (err) console.error(err)
      //    return result
      //  })
      //  console.log(res)
      await contractService.addStakeHolder(accounts[0])

      const formatedAccount = `${accounts[0].substring(0, 8)}...`
      setAccount(formatedAccount)
     }
    })()
  }, [])
  const createStake = async () => {
    if (stake === 0) {
      alert("complete field")
      return
    }
    // const res = await StakingContract.methods.createStake(stake).call((err, result) => {
    //   if (err) console.error(err)
    //   return result;
    // })
    const res = await contractService.createStake(stake);
    console.log(res);
  }
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
      <div>
        <TextField label="stake" variant="outlined" type="number" value={stake} onChange={e => setStake(e.target.value)} />
        <Button onClick={() => createStake()}>Add stake</Button>
      </div>
    </Container>
  )
}

export default App;