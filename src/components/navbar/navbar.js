import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import WarningIcon from '@material-ui/icons/Warning';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

import './navbar.scss';

const Navbar = ({navOption,onNavPress}) => {
  return(
    <div className="navbar-canvas">
      <div onClick={()=>onNavPress(0)} className={`nav-item ${navOption===0 ? "selected" : null}`}>
        <HomeIcon/>
        {navOption===0 ? <p className="nav-item-text">Home</p> : null}
      </div>
      <div onClick={()=>onNavPress(1)} className={`nav-item ${navOption===1 ? "selected" : null}`}>
        <WarningIcon/>
        {navOption===1 ? <p className="nav-item-text">Emergency</p> : null}
      </div>
      <div onClick={()=>onNavPress(2)} className={`nav-item ${navOption===2 ? "selected" : null}`}>
        <AccountBalanceWalletIcon/>
        {navOption===2 ? <p className="nav-item-text">Expense</p> : null}
      </div>
    </div>
  )
}
export default Navbar;