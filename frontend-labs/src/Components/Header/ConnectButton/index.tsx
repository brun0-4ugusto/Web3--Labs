import { useEffect, useState } from "react";
import Button from '@mui/material/Button';


export default function ConnectButton(){
    const [connection, setConnection] = useState<string>("Não Conectado");
    const connect = async () => {
        if (window.ethereum) {
          try {
            const address = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
    
            setConnection(address[0]);
          } catch (err) {
            console.log(err);
          }
        } else {
          console.log("Metamask não instalada");
        }
      };
    
      useEffect(() => {
        connect();
      }, []);

      useEffect(()=>{
        try{
          window.ethereum.on('accountsChanged', (accounts:Array<string>)=>{
            if(accounts.length !== 0){
                setConnection(accounts[0]);
            }else{
                setConnection("Não Conectado")
            }
          });
        }catch(err){
          console.log(err)
        }
        
      })
       if(connection === "Não Conectado"){
        return <Button variant="outlined" color="error" onClick={connect}>{connection}</Button>
      } 
      return(<Button variant="contained" color="success" onClick={connect}>{connection}</Button>)
}