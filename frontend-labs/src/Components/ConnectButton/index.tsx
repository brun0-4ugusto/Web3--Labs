import { useEffect, useState } from "react";

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
            console.log(accounts);
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
      
      return(<button onClick={connect}>{connection}</button>)
}