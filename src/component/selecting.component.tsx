const Settings = (props: any) => {
    return (
        <div className="selecting-div">
          <select className="selecting account-selecting" onChange={props.selectAccount}>
            {(props.wallets as [{name: '', address: '', priKey: ''}]).map(item => (
              <option className="accountItem">{item.name}</option>
            ))}
          </select>
          <select className="selecting token-selecting" onChange={props.selectToken}>
            {(props.tokens as [{name: '', address: '', abi: ''}]).map(item => (
              <option className="tokenItem">{item.name}</option>
            ))}
          </select>
        </div>
    )
}

export default Settings;