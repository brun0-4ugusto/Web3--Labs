import web3 from "./web3";

export default async function networkId(){
    let networkId = String(await web3.eth.net.getId());
    return networkId;
}