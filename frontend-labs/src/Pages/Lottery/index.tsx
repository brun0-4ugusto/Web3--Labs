import CasinoIcon from "@mui/icons-material/Casino";
import styles from "./Lottery.module.css";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import lottery from "../../Assets/images/lottery.png";
import ButtonLottery from "./ButtonLottery";
import { useState } from "react";



export default function Lottery() {
    const [players,setPlayers]= useState(0)

    return (
        <main className={styles.content}>
            <img
                src={lottery}
                alt="lottery"
                className={styles["imgbackground"]}
            />
            <section className={styles.informations}>
                <h2 className={styles.title}>Concurso De Sorte</h2>
                <span className={styles.subtitle}>Teste sua sorte</span>
                <h3 className={styles.information}>
                    O concurso de sorte corre todas as quartas e você tem a
                    chance de ganhar uma enorme quantia em CryptoLabCoins ✨
                </h3>
                <span className={styles.subtitle}>
                    Você pode participar quantas vezes quiser
                </span>
                <div className={styles.icons}>
                    <CasinoIcon fontSize="large" />
                    <CasinoIcon fontSize="large" />
                    <CasinoIcon fontSize="large" />
                    <CasinoIcon fontSize="large" />
                </div>
            </section>
            <section className={styles.game}>
                <EmojiEventsIcon
                    sx={{ fontSize: 200 }}
                    className={styles.trophy}
                />
                <div className={styles.gameInformation}>
                    <ButtonLottery players={players} setPlayers={setPlayers}/>
                    <span className={styles.subtitleVariant}>
                        Tente sua sorte agora mesmo
                    </span>
                    
                    
                    
                </div>
            </section>
        </main>
    );
}
