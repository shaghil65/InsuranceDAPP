import React, { useState, useEffect } from "react";
import "./Manager.css";

const Manager = ({state}) => {


    const [account, setAccount] = useState("");
  const [cbalance, setCbalance] = useState(0);

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      setAccountListener(web3.givenProvider);
      setAccount(accounts[0]);
    };
    state.web3 && getAccount();
  }, [state, state.web3]);

  const contractBalance = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods
        .getBalance()
        .call({ from: account });
      console.log(balance);
      setCbalance(balance);
    } catch (e) {
      setCbalance("You are not the manager");
    }
  };


  return (
    <div>
          <h2>Manager</h2>
        <ul className="list-group" id="list">
      <div className="center">
        <li className="list-group-item" aria-disabled="true">
          <b>Connected account :</b> {account}
        </li>
       
        <li className="list-group-item">
          <b>Balnace : </b> {cbalance} ETH
          <button className="button1" onClick={contractBalance}>
            Click For Balance
          </button>
        </li>
      </div>
    </ul>
      
    </div>
  )
}

export default Manager
