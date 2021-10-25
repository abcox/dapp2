import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.svg';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json';
import Navbar from './Navbar';

const tryEnableEth = async () => {
  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      //return await window.ethereum.sendAsync('eth_requestAccounts')
      //accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    } else if (window.web3) {
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

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // load contract
    // ref: https://web3js.readthedocs.io/en/v1.2.3/web3-eth-contract.html#new-contract
    // get network id
    const networkId = await web3.eth.net.getId()
    const network = SocialNetwork.networks[networkId]
    if (network) {
      const socialNetwork = new web3.eth.Contract(SocialNetwork.abi, network.address)
      this.setState({ socialNetwork })
      const postCount = await socialNetwork.methods.postCount().call()
      this.setState({ postCount })
      console.log(`postCount: ${postCount}`)
    } else {
      alert('SocialNetwork not deployed')      
    }
  }

  async componentWillMount() {
    await tryEnableEth()
    await this.loadBlockchainData()
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      socialNetwork: null,
      postCount: 0
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
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
