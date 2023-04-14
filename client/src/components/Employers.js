import React, { useEffect, useState } from "react";
import "./Employers.css"
const Employers = ({ state, address }) => {
  const [account, setAccount] = useState("No account connected");
  const [registerdEmployers, setRegisterdEmployers] = useState([]);
//   const [reload, setReload] = useState(false);

//   const reloadEffect = () => {
//     setReload(!reload);
//   };

//   const setAccountListener = (provider) => {
//     provider.on("accountsChanged", (accounts) => {
//       setAccount(accounts[0]);
//     });
//   };
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      //  console.log(accounts);
    //   setAccountListener(web3.givenProvider);

      setAccount(accounts[0]);
    };
    state.web3 && getAccount();
  }, [state, state.web3]);
  useEffect(() => {
    const getEmployers = async () => {
      const { contract } = state;
      const Employers = await contract.methods.getAllEmployees().call();
      const registerdEmployers = await Promise.all(
        Employers.map((player) => {
          return player;
        })
      );

      console.log(registerdEmployers);
      setRegisterdEmployers(registerdEmployers);
    //   reloadEffect();
    };
    state.contract && getEmployers();
  }, [state, state.contract]);
  return (
    <>
    
    <h2>Employer View</h2>
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <b>Connected account :</b> {account}
          </li>
          <li className="list-group-item">
            <b>Please pay 1 ether on this contract address : </b> {address}
          </li>
          <li className="list-group-item">
            <b>Registerd Employers </b>:
            <br />
            <br />
            {registerdEmployers.length !== 0 &&
              registerdEmployers.map((name) => <p key={name}>{name}</p>)}
          </li>
        </div>
      </ul>
    </>
  );
};
export default Employers;