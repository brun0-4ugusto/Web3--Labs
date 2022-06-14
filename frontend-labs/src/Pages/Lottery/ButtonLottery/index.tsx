import { Button, Tooltip } from "@mui/material";
import lottery from "../../../ContractsAbi/Lottery.json";
import { Contract } from "web3-eth-contract";
import { useEffect } from "react";
import NumberPlayers from "./NumberPlayers";
import lotteryCall from "../../../Web3Content/lotteryInstance";
import labCoinCall from "../../../Web3Content/labCoinInstance";
import networkIdCall from "../../../Web3Content/networkId";
import {ObjectKey} from "../../../Types/networkId"


interface Props {
    players: number;
    setPlayers: React.Dispatch<React.SetStateAction<number>>;
}

export default function ButtonLottery(props: Props) {
    let lotteryInstance: Contract;
    let labCoinInstance: Contract;
    useEffect(() => {
        loadContractsData();
    });
    const loadContractsData = async () => {
        labCoinInstance = await labCoinCall();
        return (lotteryInstance = await lotteryCall());
    };

    const play = async () => {
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            let networkId = await networkIdCall() as ObjectKey; 
            await labCoinInstance.methods
                .approve(lottery.networks[networkId].address, BigInt(200e18))
                .send({
                    from: accounts[0],
                })
                .on("transactionHash", async () => {
                    await lotteryInstance.methods
                        .enter()
                        .send({ from: accounts[0] })
                        .on("receipt", async () => {
                            const players = await lotteryInstance.methods
                                .getPlayers()
                                .call();
                            console.log(players.length);
                            props.setPlayers(players.length);
                        });
                });
        } catch (err) {
            console.log(err);
        }
    };

    const text = "Para participar, você precisa de no mínimo 200 CLC";

    return (
        <>
            <Tooltip title={text}>
                <Button
                    variant="contained"
                    sx={{ background: "#ffc581" }}
                    color="secondary"
                    onClick={play}
                >
                    Jogar
                </Button>
            </Tooltip>
            <NumberPlayers
                numberPlayers={props.players}
                setPlayers={props.setPlayers}
                lotteryInstance={loadContractsData}
            />
        </>
    );
}
