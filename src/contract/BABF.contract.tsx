import { ethers } from 'ethers';
import Web3 from 'web3';
import BABF_abi from './BABF.abi.json';
import { getBigNumber } from '../lib/helper';
import { AbiItem, toWei } from 'web3-utils';

const Win:any = window;

async function mintItemWeb3(number: any) {
    const tokenAddress = process.env.REACT_APP_TEST_TOKEN || '';
    const walletAddress = process.env.REACT_APP_WALLET_1;
    const privateKey = process.env.REACT_APP_WALLET_1_PRIVATEKEY || '';
    const provider = new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/83dc80d8a0ea430a86135e955f7bfdba");
    const web3js = new Web3(provider);
    const contract = new web3js.eth.Contract(BABF_abi as AbiItem[], tokenAddress);

    const tx = {
        from: walletAddress,
        to: tokenAddress,
        gasPrice: toWei('5', 'gwei'),
        gas: 300000,
        data: contract.methods.mintTokens(number).send().encodeABI()
    };

    const signedTx = await web3js.eth.accounts.signTransaction(tx, privateKey);
    console.log(signedTx);
    // const response = await web3js.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);

}

async function mintItem(number: any, amount: any) {
    const tokenAddress = process.env.REACT_APP_TEST_TOKEN || '';
    const provider = new ethers.providers.WebSocketProvider("wss://ropsten.infura.io/ws/v3/83dc80d8a0ea430a86135e955f7bfdba");
    const signer = provider.getSigner();

    const contract = new ethers.Contract(tokenAddress, BABF_abi, provider);
    
    const privateKey = process.env.REACT_APP_WALLET_1_PRIVATEKEY || '';
    const wallet = new ethers.Wallet(privateKey);

    const account = contract.connect(wallet);

    
    let response = await account.mintTokens(number);
    console.log(response);
}

// export default mintItem;
export default mintItem;