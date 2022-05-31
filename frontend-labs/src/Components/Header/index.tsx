import { Link } from "react-router-dom";
import ConnectButton from "../ConnectButton";
import Navigation from "../Navigation";
import styles from "./Header.module.css";

export default function PaginaPadrao() {
  return (
    <>
      <header className={styles.header}>
      <Link to={"/"} className={styles.link}><div className={styles.header__logo}>CryptoLab</div></Link>
        <Navigation/>
        <ConnectButton />
      </header>
    </>
  );
}
