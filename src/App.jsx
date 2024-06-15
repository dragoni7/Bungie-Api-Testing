import './App.css';
import React, { Component } from "react";
import BungieApiComponent from './components/BungieApiComponent'
import Reducer from "./Reducer"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Reducer apiKey={"22ddd9d2e20b44159efd7638435c444d"}>
          {({ store, actions }) => (
              <div>
                {store.authenticated ? (
                  <div>
                    authenticated
                  </div>
                ) : (
                  <button onClick={actions.onAuthorize}>Log in</button>
                )}
              </div>
          )}
        </Reducer>
      </div>
    );
  }
}

export default App;
