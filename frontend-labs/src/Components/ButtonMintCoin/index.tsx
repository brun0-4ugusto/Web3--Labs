import { Button } from "@mui/material";
import { useEffect } from "react";
import { AbiItem } from 'web3-utils'
import Web3 from "web3";
import LabCoin from "../../ContractsAbi/LabCoin.json";
import { Contract } from "web3-eth-contract";
type ObjectKey = keyof typeof LabCoin.networks;
export default function ButtonMint(){
    let web3:Web3;
    try{
        web3 = new Web3(window.ethereum)
    }catch(e){
        console.log(e)
    }
    
    let labCoinInstance:Contract;
    const contractCall = async () =>{
        try{const networkId = String(await web3.eth.net.getId()) as ObjectKey;
            const deployedNetwork = LabCoin.networks[networkId];
            const abi = LabCoin.abi as AbiItem[]
            labCoinInstance = new web3.eth.Contract(abi, deployedNetwork && deployedNetwork.address)
            }
            catch(error){
                console.log(error);
            }
        
    }
    useEffect(()=>{
        contractCall()
    })
   
    const mint = async ()=>{
        try{ const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        await labCoinInstance.methods.mint().send({from:accounts[0], value:web3.utils.toWei('0.025', 'ether')})}
        catch(err){
            console.log(err)
        }
       
    }
    
    return(<Button variant="contained" color="secondary" onClick={mint}>Clique aqui e pegue algumas LabCoins</Button>)
}