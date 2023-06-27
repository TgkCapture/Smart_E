import React from 'react';
import { useStateContext } from '@/context';
import '@/styles/script.js';

const Header = () => {
    const { userBalance, disconnect, address, contract, connect } = useStateContext();

    const OnDropDown = (id,blur,num) => {
        if(num == 0){
            document.getElementById(id).style.opacity = 1;
            document.getElementById(id).style.visibility = "visible";
            document.getElementById(id).style.transform = "translateY(40px)";
            document.getElementById(blur).style.opacity = 1;
            document.getElementById(blur).style.visibility = "visible";
        }
        else{
            document.getElementById(id).style.opacity = 0;
            document.getElementById(id).style.visibility = "hidden";
            document.getElementById(id).style.transform = "translateY(20px)";
            document.getElementById(blur).style.opacity = 0;
            document.getElementById(blur).style.visibility = "hidden";
        }
    }

  return (   
    
    <header>
        <div className='nav-header'>
            <div className='nav-heading'>
                <div className='logo-title'>
                    <a href='/'>
                    <img src='/icons/icon_1.png' />
                    </a>
                </div>
                <div className="menu">
                    <div className="menu-option" >
                        <a href='/' className='navbar-link'>Home</a>
                    </div>
                    <div className="menu-option explore" onClick={() => OnDropDown('explore','on-blur-two',0)}>
                        <a href='#' className='navbar-link'>Explore</a>
                        <div className="drop" id="explore">
                            <div className="drop-menu">
                                <a href='activity' className='navbar-link'>Activity</a>
                            </div>
                           
                            <div className="drop-menu">
                                <a href='author' className='navbar-link'>Authors</a>
                            </div>
                           
                            <div className="drop-menu">
                                <a href='#' className='navbar-link'>Option 1</a>
                            </div>
                                                 
                            <div className="drop-menu">
                                <a href='create' className='navbar-link'>Create</a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-option">
                        <a href='propertyView' className='navbar-link'>Properties</a>
                    </div>
                    <div className="menu-option">
                        <a href='about' className='navbar-link'>About</a>
                    </div>
                   
                </div>
            </div>
            <div className='side'>
                <div className="search">
                    <div className="search-input">
                        <input type="search" name="" id="" placeholder="Search" />
                    </div>
                    <div className="search-logo">
                        <img src="icons/search_1.png" alt="" />
                    </div>
                </div>
                {address ? (
                <div className="account">
                    <div className="account-logo" onClick={() => OnDropDown('drop','on-blur-one',0)}>
                        <img src="icons/user.svg" alt="" />
                    </div>
                    <div className="profile-drop" id="drop">
                        <div className="drop-menu">
                            <h3>Account Balance</h3>
                            <p className='balance'>{userBalance}</p>
                        </div>
                        <hr />
                        <div className="drop-menu">
                            <a href='#' className='navbar-link'>Add Funds</a>
                        </div>
                        <div className="drop-menu">
                            <a href='#' className='navbar-link'>Edit Profile</a>
                        </div>
                        <div className="drop-menu">
                            <a href='#' className='navbar-link' onClick={() => disconnect()}>Logout</a>
                        </div>
                    </div>
                </div>
                ) : ("")}

                {address ? (""):(
                <div className="connect">
                    <button onClick={() => connect()}>Connect</button>
                </div>
                )}
            </div>
        </div>

        <div className="on-blur" id="on-blur-one" onClick={() => OnDropDown('drop','on-blur-one',1)}></div>
        <div className="on-blur" id="on-blur-two" onClick={() => OnDropDown('explore','on-blur-two',1)}></div>
    </header> 
  );
}

export default Header;               