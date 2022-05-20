const labCoin = artifacts.require("LabCoin");
const BN = web3.utils.BN;

contract("LabCoin Token Test", async (accounts) => {
  let clc;
  before(async () => {
    clc = await labCoin.deployed();
  });
  it("Contract Deployed", async () => {
    let basicVariables = {
      name: await clc.name(),
      symbol: await clc.symbol(),
      decimals: parseInt(BN(await clc.decimals()).toString("")),
      totalSupply: BN(await clc.totalSupply()).toString(""),
    };

    labCoinVariables = {
      name: "LabCoin",
      symbol: "CLC",
      decimals: 18,
      totalSupply: "1000000000000000000000",
    };
    assert.deepEqual(labCoinVariables, basicVariables);
    assert.ok(labCoin);
  });
  it("Balance Owner", async ()=>{
    const balanceOf = BN(await clc.balanceOf(accounts[0])).toString("");
    assert.equal("1000000000000000000000",balanceOf);
  })
});
