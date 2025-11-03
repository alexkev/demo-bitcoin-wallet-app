const bitcoin = require("bitcoinjs-lib");
const ECPairFactory = require("ecpair").default;
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const fs = require("fs");

const ECPair = ECPairFactory(ecc);
const bip32 = BIP32Factory(ecc);
const network = bitcoin.networks.testnet;

async function createWallet() {
  try {
    const seed = Buffer.alloc(32);
    for (let i = 0; i < 32; i++) {
      seed[i] = Math.floor(Math.random() * 256);
    }

    const root = bip32.fromSeed(seed, network);
    const child = root.derivePath("m/84'/1'/0'/0/0");
    const keyPair = ECPair.fromPrivateKey(child.privateKey, { network });

    const pubkeyHash = bitcoin.crypto.hash160(keyPair.publicKey);

    const { address } = bitcoin.payments.p2wpkh({
      hash: pubkeyHash,
      network: network,
    });

    const privateKey = keyPair.toWIF();

    console.log(`| Public Address | ${address} |`);
    console.log(`| Private Key    | ${privateKey} |`);

    const wallet = {
      address: address,
      privateKey: privateKey,
    };

    const walletJSON = JSON.stringify(wallet, null, 4);
    fs.writeFileSync("wallet.json", walletJSON);

    console.log(`Wallet created and saved to wallet.json`);
  } catch (error) {
    console.error(error);
  }
}

createWallet();
