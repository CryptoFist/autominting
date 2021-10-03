const Settings = (props: any) => {
    return (
        <div className="settings-div">
          <div className="ether-count">
            <p className="subscript">count of NFT : </p>
            <input type="number" className="count-ether" onChange={props.changeNFT} value={props.nftCount} />
          </div>
          <div className="nft-count">
            <span className="text">Payable Amount : </span>
            <input type="number" id="value-ether" name="value-ether" className="nft-value value-ether" 
            value={props.payableAmount} onChange={props.changePayableAmount} />
            <span className="text unit">ETH</span>
          </div>
          <div className="nft-count">
          <span className="text">Gas Fee : </span>
            <input type="number" id="gas-ether" name="gas-ether" className="nft-value gas-ether"
               value={props.gasFee} onChange={props.changeGasFee} />
               <span className="text unit">GWEI</span>
          </div>
        </div>
    )
}

export default Settings;