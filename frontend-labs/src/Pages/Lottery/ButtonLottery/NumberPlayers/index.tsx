import { Contract } from "web3-eth-contract";
import { useEffect } from "react";
import styles from "./NumberPlayers.module.css";

interface Props {
    numberPlayers: number;
    setPlayers: React.Dispatch<React.SetStateAction<number>>;
    lotteryInstance: () => Promise<Contract>;
}
export default function NumberPlayers(props: Props) {
    useEffect(() => {
        const attPlayers = async (lotteryInstance: Contract) => {
            const players = await lotteryInstance.methods.getPlayers().call();

            props.setPlayers(players.length);
        };
        const contractsInteraction = async () => {
            let lotteryInstance = await props.lotteryInstance();
            attPlayers(lotteryInstance);
        };
        contractsInteraction();
    });

    return (
        <span className={styles.numberPlayers}>
            Número de Jogadores:0{props.numberPlayers}
        </span>
    );
}
