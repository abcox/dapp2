import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.svg';
import './App.css';

const tryEnableEth = async () => {
  try {
    if (window.ethereum) {
      console.log('here 1')
      window.web3 = new Web3(window.ethereum)
      //return await window.ethereum.sendAsync('eth_requestAccounts')
      //accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
      console.log('here 1')
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert('Ethereum support required. Try <a src="https://metamask.io/">MetaMask</a>')
    }
  } catch (error) {
    window.alert(`Ethereum support required. ERROR: ${error.message}`)
    if (error.code === 4001) {
      window.alert('Ethereum support request denied by user.')
    } else {
      window.alert('Try <a src="https://metamask.io/">MetaMask</a>')
    }
    //setError(error);
  }
}

class App extends Component {

  async componentWillMount() {
    //await this.loadWeb3()
    await tryEnableEth()
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    //console.log(`accounts: ${accounts}`)
    this.setState({ account: accounts[0] })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Social Network Blockchain Demo
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
              <small className="text-secondary">{this.state.account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="app-logo" alt="logo" />
                </a>
                <h1>Social Network Blockchain Demo</h1>
                <small className="text-secondary">Dapp University Starter Kit</small>
                <p>
                  Edit <code>src/components/App.js</code> and save to reload.
                </p>
                <a
                  className="App-link"
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEARN BLOCKCHAIN <u><b>NOW! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
