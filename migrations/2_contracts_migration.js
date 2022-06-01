var labCoin = artifacts.require("LabCoin");
var Lottery = artifacts.require("Lottery");

module.exports = function (deployer) {
  deployer.deploy(labCoin).then(async () => {
    const tokenInstance = await labCoin.deployed();
    await deployer.deploy(Lottery, tokenInstance.address);
  });
};
