import web3 from "./web3";
import labCoin from "../ContractsAbi/LabCoin.json";

export default async function labCoinCall() {
    const networkId = await web3.eth.net.getId();
    const labCoinNetwork = labCoin.networks[networkId];
    const labCoinAbi = labCoin.abi;
    let labCoinInstance = new web3.eth.Contract(labCoinAbi, labCoinNetwork.address);
    return labCoinInstance
    
}
