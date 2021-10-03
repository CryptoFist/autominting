import { useEffect } from "react";

const Details = (props: any) => {
    return (
        <div className="details-div">
          {/* <p className="minting-info">
            <span className="value-info">NFT Balance</span>
            {props.nftBalance}
          </p> */}

          <p className="minting-info">
            <span className="value-info">Transaction Status</span>
            <span className="tx-status">{props.txStatus}</span>
          </p>
          {/* <p className="minting-info">
            <span className="value-info">ETH Balance</span>
            {props.ethBalance} ETH
          </p> */}
        </div>
    )
}

export default Details;