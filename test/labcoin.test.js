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
  it("Balance Owner", async () => {
    const balanceOf = BN(await clc.balanceOf(accounts[0])).toString("");
    assert.equal("1000000000000000000000", balanceOf);
  });
  it("Transfer test", async () => {
    const to = accounts[1];
    const from = accounts[0];
    const amount = 1000;
    balanceRecepientBefore = BN(await clc.balanceOf(to)).toString("");
    balanceSenderBefore = BN(await clc.balanceOf(from)).toString("");
    await clc.transfer(to, amount);
    balanceSenderAfter = BN(await clc.balanceOf(from)).toString("");
    balanceRecepientAfter = BN(await clc.balanceOf(to)).toString("");
    assert.equal("0", balanceRecepientBefore);
    assert.equal("1000", balanceRecepientAfter);
    assert.equal("1000000000000000000000", balanceSenderBefore);
    assert.equal("999999999999999999000", balanceSenderAfter);
  });
  it("Approve", async () => {
    const owner = accounts[1];
    const spender = accounts[2];
    const amount = 400;
    await clc.approve(spender, amount, { from: owner });
    assert.equal(
      amount.toString(),
      BN(await clc.allowance(owner, spender)).toString("")
    );
  });
  it("TransferFrom", async () => {
    const owner = accounts[1];
    const spender = accounts[2];
    const recepient = accounts[3];
    const amount = 200;
    const allowanceSpenderBefore = parseInt(
      BN(await clc.allowance(owner, spender)).toString()
    );
    const balanceOwnerBefore = parseInt(
      BN(await clc.balanceOf(owner)).toString()
    );

    await clc.transferFrom(owner, recepient, amount, { from: spender });
    const balanceOwnerAfter = parseInt(
      BN(await clc.balanceOf(owner)).toString()
    );

    const allowanceSpenderAfter = parseInt(
      BN(await clc.allowance(owner, spender)).toString()
    );
    const balanceRecepientAfter = BN(await clc.balanceOf(recepient)).toString();
    assert.equal(amount.toString(), balanceRecepientAfter);
    assert.equal(allowanceSpenderBefore - amount, allowanceSpenderAfter);
    assert.equal(balanceOwnerBefore - amount, balanceOwnerAfter);
  });
  it("Mint Token", async () => {
    await clc.mint({
      from: accounts[5],
      value: web3.utils.toWei("0.025", "ether"),
    });
    assert.equal(
      "1000000000000000000000",
      BN(await clc.balanceOf(accounts[5])).toString()
    );
  });
});
