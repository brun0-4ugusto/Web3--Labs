import Web3 from "web3";
function getWeb3() {
    if (window.ethereum) {
        try {
            return new Web3(window.ethereum);
        } catch (err) {
            console.log(err);
        }
    } else {
        console.log("Metamask não instalada");
    }
}

const web3 = getWeb3();
export default web3;
