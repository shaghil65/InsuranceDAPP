import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Navbar from "./components/Navbar.js";
import Insurance from "./contracts/Insurance.json";
import Manager from "./components/Manager"
import Employers from "./components/Employers"
import { Route, Link } from "react-router-dom";
import "./App.css";

const App = () => {
  const [state, setState] = useState({
    web3: null,
    contract: null,
  });

  const [address, setAddress] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();

        const deployedNetwork = Insurance.networks[networkId];
        console.log("Contract Address:", deployedNetwork.address);
        const instance = new web3.eth.Contract(
          Insurance.abi,
          deployedNetwork && deployedNetwork.address
        );
        setAddress(deployedNetwork.address);
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Falied to load web3 or contract.");
        console.log(error);
      }
    };
    init();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Route path={'/manager'} >
        <Manager state={state}></Manager>
      </Route>

      <Route path={'/employers'} >
        <Employers state={state} address = {address}></Employers>
      </Route>
    </div>
  );
};
export default App;
