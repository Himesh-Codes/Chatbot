import {useState } from 'react'
import Logo from '../public/static/img/navbar-brand.png';
import './App.css'
import Botwidget from './components/Botwidget';
import Sidepane from './components/Sidepane';
import { ISidePane } from './interfaces/ISidepane';
import { MessagesContentContextProvider } from './components/context/MessagesContentContext';
function App() {
  const [isOpen, open] = useState(false);
  const sidePaneProps: ISidePane = {isOpen: isOpen, open: open};

  return (
    <>
    <div className='page-content'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <img src={Logo} width="30" height="30"
          className="d-inline-block align-top" alt=""/>
        <a className="navbar-brand navbarstyle" href="/">&nbsp;Amazon ARIK</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link " href="/">Home</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link " href="/v2/arik/customer/onboard">ARIK Subscriptions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/directID/service/UI">Tiger Tools</a>
            </li>
            <li className="nav-item">
              <a id="tools-home" className="nav-link" href="/internal_tools/home">AEE-SE ToolKit</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                More OE Tools
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="/page0">PMS</a>
                <a className="dropdown-item" href="/adieu_service/aloha">Aloha</a>
                <a className="dropdown-item" href="/odin_bulk/">Odin Bulk I/E</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="/risks_resolver/policy_engine">OE Risks Resolver</a>
                <a className="dropdown-item" href="/imr_dashboard/imr_reporting">IMR Reporting Preferences</a>
              </div>
            </li> 
          </ul>
            <span className="navbar-right" style={{color: "#FF9900"}}>
              <em className="fa fa-comments"> </em>
              <a style={{color: "#337ab7"}} href="https://w.amazon.com/bin/view/Amazon_ARIK/#HContactUS" target="_blank"
                rel="noopener noreferrer">
                Feedback
              </a>

              <em className="fa fa-info"> </em>
              <a style={{color: "#337ab7"}} href="https://w.amazon.com/bin/view/Amazon_ARIK/Customer_User_Guide/" target="_blank"
                rel="noopener noreferrer">
                Need Help?
              </a>
            </span>

        </div>
      </nav>
      <div className="container-fluid">
        <div className="row">
            <div className="col-md-12">
                <div className="jumbotron">
                    <h2>
                        Welcome, Himesh
                    </h2>
                    <p>
                        Amazon ARIK is a Report Self-Subscription Portal. We have a collection of metrics like Ticketing
                        Metrics, SIM Metrics, and miscellaneous OE tools. Which you can subscribe for your team as a
                        mailer and modify it according to your needs. This is primarily a
                        mailer service that will address your WBR, MBR metric requirements, and few tools that can make
                        your life easy.
                    </p>
                    <p>
                        <a className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer" href="https://w.amazon.com/bin/view/Amazon_ARIK/">Learn more</a>
                    </p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <button type="button" className="btn btn-primary btn-lg btn-block">
                    Let's get started
                </button>
            </div>
        </div>
      </div>
      <Botwidget {...sidePaneProps}/>
    </div>
    <MessagesContentContextProvider>
        <Sidepane {...sidePaneProps}/>
    </MessagesContentContextProvider>
    </>
  )
}

export default App
