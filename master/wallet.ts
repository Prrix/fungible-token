import { Keypair, LAMPORTS_PER_SOL, Connection } from "@solana/web3.js";
import * as fs from "fs";
import { textChangeRangeIsUnchanged } from "typescript";

export async function make_wallet() {
  const values: { [key: string]: string } = {};
  const endpoint = "https://api.devnet.solana.com/";
  const solanaConnection = new Connection(endpoint);

  //STEP 2 - Generate a New Solana Wallet
  const keypair = Keypair.generate();
  console.log(
    `Generated new KeyPair. Wallet PublicKey: `,
    keypair.publicKey.toString()
  );
  values.pubkey = keypair.publicKey.toString();

  //STEP 3 - Write Wallet Secret Key to a .JSON
  const secret_array = keypair.secretKey
    .toString() //convert secret key to string
    .split(",") //delimit string by commas and convert to an array of strings
    .map((value) => Number(value)); //convert string values to numbers inside the array

  const secret = JSON.stringify(secret_array);
  values["secret"] = keypair.secretKey.toString(); //Covert to JSON string

  fs.writeFile("guideSecret.json", secret, "utf8", function (err) {
    if (err) throw err;
    console.log("Wrote secret key to guideSecret.json.");
  });

  //STEP 4 - Airdrop 1 SOL to new wallet
  const txId = await solanaConnection.requestAirdrop(
    keypair.publicKey,
    LAMPORTS_PER_SOL
  );

  console.log(`Airdrop Transaction Id: ${txId}`);
  values.transid = txId;
  console.log(`${txId}`);

  console.log(`https://explorer.solana.com/tx/${txId}?cluster=devnet`);
  console.log("112");
  return values;
}
