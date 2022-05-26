import styles from "./home.module.css";
import logo from "../../Assets/images/CryptoLab.png"
import coin from "../../Assets/images/coin.png"
import ButtonMint from "../../Components/ButtonMintCoin";

export default function Home() {
  return (
    <main className={styles.content}>
      <img src={logo} alt="Logo" className={styles["imgbackground"]} />
      <section className={styles.title}>
        <h2 className={styles.h2}>Bem-Vindo ao CryptoLab</h2>
        <p>Meu laboratório de testes de web3</p>
      </section>
      <section className={styles.getCoin}>
        <ButtonMint/>
        <img src={coin} alt="Logo" />
      </section>
    </main>
  );
}
