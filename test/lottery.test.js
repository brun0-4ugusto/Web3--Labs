const lotteryContract = artifacts.require('Lottery')
const BN = web3.utils.BN

contract('Lottery Test', async (accounts) => {
  let lottery
  before(async () => {
    lottery = await lotteryContract.deployed()
  })
  it('Contract Deployed', async () => {
    assert.ok(lottery)
  })
  it('Enter Lottery', async () => {
    const minimumValue = 0.025
    await Promise.all(
      accounts.map(async (account) => {
        await lottery.enter({
          from: account,
          value: web3.utils.toWei('0.025', 'ether'),
        })
      }),
    )
    const balanceContract = BN(await lottery.getBalance()).toString()
    const assertValue = minimumValue * accounts.length
    const balanceValueInEther = web3.utils.fromWei(balanceContract, 'ether')
    assert.equal(parseFloat(balanceValueInEther), assertValue)
  })
  it('Picking a winner', async () => {
    const owner = await lottery.owner()
    const balanceOwnerBefore = await web3.eth.getBalance(owner)
    let playersBalance = await Promise.all(
      accounts.map(async (player) => {
        return {
          player: await web3.eth.getBalance(player),
        }
      }));

    console.log(playersBalance);
    const chooseWinner = await lottery.pickWinner('QualquerPalavra')
    //console.log(chooseWinner.logs[0].args._winner);
    const balanceOwnerAfter = await web3.eth.getBalance(owner)
    assert.isAbove(parseInt(balanceOwnerAfter), parseInt(balanceOwnerBefore))
  })
})
