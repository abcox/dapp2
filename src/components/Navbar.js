import React, { Component } from 'react';
import Identicon from 'identicon.js';


class Navbar extends Component {
    render() {
        const identiconHex = this.props.account || "0".repeat(15);
        const identicon = new Identicon(identiconHex, 30).toString();
        return (
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
                        <small className="text-secondary">{this.props.account}</small>
                        <img className="ml-2" width="30" height="30" src={`data:image/png;base64,${identicon}`}/>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar;