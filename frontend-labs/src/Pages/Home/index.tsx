import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from "web3";
import getWeb3 from "../../Assets/Web3/getWeb3";
import styles from "./home.module.css";

const rotas = [
  {
    label: "Lottery",
    to: "/lottery",
  },
];

export default function Home() {
  const [connection, setConnection] = useState<string>("Não Conectado");

  useEffect(() => {
    getWeb3()
      .then((web3: Web3) => {
        web3.eth.getAccounts().then((data) => setConnection(data[0]));
      })
      .catch((web3: Web3) => {
        console.log(web3);
      });
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>CryptoLab</div> 
      <nav className={styles.header__nav}>
        <ul>
          {rotas.map((rota, index) => (
            <li key={index}>
              <Link to={rota.to}>{rota.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>{connection}</div>
    </header>
  );
}
