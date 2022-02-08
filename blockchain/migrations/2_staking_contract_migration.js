const StakingContract = artifacts.require("StakingContract");

module.exports = function (deployer) {
  deployer.deploy(StakingContract, '0x4a6a87831f8c2d5fa43cc7d360ee4280e36469b6');
};
