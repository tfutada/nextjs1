import type {NextPage} from "next";
import {useWallet} from "@solana/wallet-adapter-react";
import {useProgram} from "@thirdweb-dev/react/solana";
import {useEffect, useState} from "react";
import {TokenMetadata} from "@thirdweb-dev/sdk/dist/declarations/src/core/schema/token";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

// Token address - 'FUTA'
const TokenAddress = 'AdWpTqwUFR23xnS8XSoFVF4S9WkGN7QGuaTijMSkqvE3'

const Home: NextPage = () => {
    const wallet = useWallet();
    const {program} = useProgram(TokenAddress, "token");

    const [metadata, setMetadata] = useState<TokenMetadata | null>(null)

    useEffect(() => {
        const afc = async () => {
            const metadata = await program?.getMetadata();
            setMetadata(metadata)
        }

        if (wallet.connected) {
            afc().catch(console.error);
        }

    }, [wallet.connected, program])

    return (
        <div>
            {metadata && <pre>{JSON.stringify(metadata, null, 2)}</pre>}
        </div>
    );
}

const MetaData = (meta: TokenMetadata): JSX.Element => {
    return (
        <>
            <pre>{JSON.stringify(meta, null, 2)}</pre>
        </>
    )
}

export default Home;
