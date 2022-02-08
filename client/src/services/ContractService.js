import Web3 from "web3";
import StakingContractArtifacts from "../abi/StakingContract.json"

class ContractService {
  #_web3;
  #_contract;
  #_contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

  constructor() {
    this.#_web3 = new Web3(Web3.givenProvider);
    this.#_contract = new this.#_web3.eth.Contract(StakingContractArtifacts.abi, this.#_contractAddress);
  }

  async addStakeHolder(account) {
    return new Promise((resolve, reject) => {
      this.#_contract.methods.addStakeHolder(account).call((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

  async createStake(stake) {
    return new Promise((resolve, reject) => {
      this.#_contract.methods.createStake(stake).call((err, res) => {
        if (err) reject(err);
        resolve(res)
      });
    });
  }

  async getCurrentStake(account) {
    return new Promise((resolve, reject) => {
      this.#_contract.methods.getStakeOfHolder(account).call((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }

}

export {ContractService}