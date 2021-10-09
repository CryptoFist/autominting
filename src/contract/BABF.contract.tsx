import Web3 from 'web3';
import { AbiItem,toWei } from 'web3-utils';

const web3js = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/83dc80d8a0ea430a86135e955f7bfdba'));
// const web3js = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/83dc80d8a0ea430a86135e955f7bfdba'));

const delayTime = async (delay: any) => {
    return new Promise(res => setTimeout(res, delay));
}

const getSignedTx = async (count: any, amount: any, gasFee: any, token: any, wallet: any) => {
    try {
        const tokenJS = await new web3js.eth.Contract(token.abi as AbiItem[], token.address);
        web3js.eth.accounts.wallet.add(String(wallet.priKey));
        const networkId = await web3js.eth.net.getId();
        const tx = tokenJS.methods[token.method](count);
        const data = tx.encodeABI();

        const signedTx = await web3js.eth.accounts.signTransaction({
            from: wallet.address,
            to: token.address,
            value: toWei(String(amount), "ether"),
            data,
            gasPrice: toWei(String(gasFee), "gwei"),
            gas: 300000,
            chainId: networkId
        }, String(wallet.priKey));
        return signedTx.rawTransaction;
    } catch(error: any) {
        console.log(error);
    }
    return "";
}

const sendTx = async (signedTx: any, threadID: any) => {
    let bSuccess = false;
    try {
        await web3js.eth.sendSignedTransaction(String(signedTx))
        .once('transactionHash', function(hash){ 
        })
        .once('receipt', function(receipt){
        })
        .on('confirmation', function(confNumber, receipt){ 
        })
        .on('error', function(error){ 
        })
        .then(function(receipt){
            bSuccess = true;
        });
    } catch(error: any) {
        return false;
    }
    return bSuccess;
}
const changeLocalStorage = (search: any, replace: any, setThreadStatus: any) => {
    let storage = localStorage.getItem('threadStatus');
    storage = storage?.replace(search, replace) || '';
    localStorage.setItem('threadStatus', storage);
    setThreadStatus(storage);
}
export const mintTokens = async (threadID: any, count: any, amount: any, gasFee: any, token: any, wallet: any, isEarly: any, setThreadStatus: any) => {
    let bSuccess = false;
    let retryTime = 0;

    console.log(`thread${threadID+1} start...`);
    let valName = `thread${threadID}=1`;

    while (true) {
        const signedTx = await getSignedTx(count, amount, gasFee, token, wallet);
        bSuccess = await sendTx(signedTx, threadID);
        if (bSuccess === true || isEarly === false) {
            changeLocalStorage(valName, `thread${threadID}=2`, setThreadStatus);
            // console.log(`Thread${threadID} is successed!`);
            break;
        }
        if (isEarly === false) {
            changeLocalStorage(valName, `thread${threadID}=3`, setThreadStatus);
        }
        // console.log(`Thread${threadID} is failed!`);
        retryTime ++;
        // console.log('it will retry soon.');
        delayTime(5000);
    }
}
