const Lottery = artifacts.require("Lottery");
const LabCoin = artifacts.require("LabCoin");
const BN = web3.utils.BN;

contract("Lottery Test", async (accounts) => {
  let lottery;
  let labCoin;
  before(async () => {
    labCoin = await LabCoin.deployed();
    lottery = await Lottery.deployed();
  });
  it("Contract Deployed", async () => {
    assert.ok(lottery);

    assert.equal(accounts[0], await lottery.owner());
  });
  it("Enter Lottery", async () => {
    for (let i = 0; i < accounts.length; i++) {
      await labCoin.mint({
        value: web3.utils.toWei("0.025", "ether"),
        from: accounts[i],
      });
      await labCoin.approve(lottery.address, BigInt(200e18), {
        from: accounts[i],
      });
      await lottery.enter({ from: accounts[i] });
    }
  });
  it("Pick Winner", async () => {
    assert.equal(
      BigInt(2000e18).toString(),
      BN(await lottery.getBalance()).toString()
    );
    const ownerBalanceBefore = BN(
      await labCoin.balanceOf(accounts[0])
    ).toString();
    let playersBalance = await Promise.all(
      accounts.map(async (player) => {
        return {
          [player]: BN(await labCoin.balanceOf(player)).toString(),
        };
      })
    );
    let chooseWinner = await lottery.pickWinner("Teste");
    const winnerAddress = await chooseWinner.logs[0].args._winner;
    let winnerBalanceBefore = playersBalance.filter((player) => {
      return Object.keys(player) == winnerAddress;
    });
    winnerBalanceBefore = Object.values(winnerBalanceBefore[0])[0];
    const winnerBalanceAfter = BN(
      await labCoin.balanceOf(winnerAddress)
    ).toString();
    const ownerBalanceAfter = BN(
      await labCoin.balanceOf(accounts[0])
    ).toString();
    assert.equal(
      BigInt(winnerBalanceBefore) +
        (BigInt(2000e18) * BigInt(90)) / BigInt(100),
      BigInt(winnerBalanceAfter)
    );
    assert.equal(
      BigInt(ownerBalanceBefore) + (BigInt(2000e18) * BigInt(10)) / BigInt(100),
      BigInt(ownerBalanceAfter)
    );
  });
});
