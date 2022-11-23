import styles from "../styles/Home.module.css";
import Image from "next/image";
import type {NextPage} from "next";
import {useWallet} from "@solana/wallet-adapter-react";
import {WalletMultiButton} from "@solana/wallet-adapter-react-ui";
import {useProgram, useClaimNFT} from "@thirdweb-dev/react/solana";
import MyApp from "./_app";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const Home: NextPage = () => {
    const wallet = useWallet();
    const {program} = useProgram("C7Q2ay7g9po9xKivZga8j3zXCro8iRXNbh3aNivMRGiQ", "nft-drop");
    const claim = useClaimNFT(program);

    // if (!wallet.connected) {
    //     return <div><WalletMultiButton/></div>
    // }

    return (
        <div>
            <button onClick={() => claim.mutate({amount: 1})}>
                {claim.isLoading ? "Claiming..." : "Claim NFT"}
            </button>
        </div>
    );
}

export default Home;
