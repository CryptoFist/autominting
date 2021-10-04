import Web3 from 'web3';
import BABF_abi from './abi/BABF_1.abi.json';
import { AbiItem,toWei } from 'web3-utils';

const web3js = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/83dc80d8a0ea430a86135e955f7bfdba'));
// const web3js = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/83dc80d8a0ea430a86135e955f7bfdba'));

export const getBABFBalance = async (walletAddress: any, tokenAddress: any) => {
    try {
        const token = new web3js.eth.Contract(BABF_abi as AbiItem[], tokenAddress); 
        const babfBalance = await token.methods.balanceOf(walletAddress).call();
        return babfBalance;
    } catch(error: any) {
        console.log(error);
    }
    return 0;
}

export const getEtherBalance = async (walletAddress: any) => {
    console.log(walletAddress);
    try {
        const balance = web3js.eth.getBalance(String(walletAddress));
        console.log(balance);
        return balance;
    } catch(error: any) {
        console.log(error);
    }
}

export const mintTokens = async (count: any, amount: any, gasFee: any, token: any, wallet: any, setTxStatus: any) => {
    try {
        const tokenJS = await new web3js.eth.Contract(token.abi as AbiItem[], token.address);

        web3js.eth.accounts.wallet.add(String(wallet.priKey));

        const networkId = await web3js.eth.net.getId();

        const tx = tokenJS.methods[token.method](count);
        const data = tx.encodeABI();
        console.log(data);

        const signedTx = await web3js.eth.accounts.signTransaction({
            from: wallet.address,
            to: token.address,
            value: toWei(String(amount), "ether"),
            data,
            gasPrice: toWei(String(gasFee), "gwei"),
            gas: 300000,
            chainId: networkId
        }, String(wallet.priKey));

        console.log('sendSignedTransaction');
        console.log(String(signedTx.rawTransaction));

        let result = false;
        let message = '';

        await web3js.eth.sendSignedTransaction(String(signedTx.rawTransaction))
        .once('transactionHash', function(hash){ 
            console.log(`hash is ${hash}\nconfiming transaction`);
            setTxStatus(`hash is ${hash}\n\nconfirming transaction...`);
         })
        .once('receipt', function(receipt){
            console.log(`receipt is ${receipt}`);
            // setTxStatus(`receipt is ${receipt}`);
         })
        .on('confirmation', function(confNumber, receipt){ 
            // console.log(`confirmation is ${confNumber}`);
         })
        .on('error', function(error){ 
            result = false;
         })
        .then(function(receipt){
            console.log(receipt);
            message = `minting successed!
                        BlockHash is generated : ${receipt.blockHash}
                        BlockNumber is generated : ${receipt.blockNumber}
                        Transaction hash is generated " ${receipt.transactionHash}
                        cumulativeGasUsed : ${receipt.cumulativeGasUsed}
                        gasUsed : ${receipt.gasUsed}\n`
            result = true;
        });

        const balance = Number(await getEtherBalance(wallet.address)) / 10 ** 18;
        const balacen_final = Number(parseFloat(String(balance)).toFixed(4))
        message += `current ETH is : ${balacen_final}`;
        setTxStatus(message);   
    } catch(error: any) {
        console.log(`error occupied : ${error}`);
        setTxStatus(`error occupied : ${error}`);
        return false;
    }
    return true;
}
