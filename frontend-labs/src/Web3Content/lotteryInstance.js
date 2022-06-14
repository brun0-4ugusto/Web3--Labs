import lottery from "../ContractsAbi/Lottery.json";
import web3 from "./web3";

export default async function lotteryCall() {
    const networkId = await web3.eth.net.getId();
    const lotteryNetwork = lottery.networks[networkId];
    const lotteryAbi = lottery.abi;
    const lotteryInstance = new web3.eth.Contract(
        lotteryAbi,
        lotteryNetwork.address
    );
    return lotteryInstance;
}


