import './App.css';
import React, { Component } from "react";
import BungieApiComponent from './components/BungieApiComponent'
import Reducer from "./Reducer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Reducer apiKey={process.env.REACT_APP_API_KEY}>
          {({ store, actions }) => (
              <div>
                {store.authenticated ? (
                  <div>
                    authenticated
                  </div>
                ) : (
                  <button onClick={actions.onAuthorize}>{process.env.REACT_APP_API_KEY}</button>
                )}
              </div>
          )}
        </Reducer>
      </div>
    );
  }
}

export default App;
