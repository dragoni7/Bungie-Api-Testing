import './App.css';
import React, { useEffect } from "react";
import BungieApiComponent from './components/BungieApiComponent'

function App() {

  useEffect(() => {
    window.location.replace(`https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code`)

    var tokenData = undefined;
    var authCode = undefined;

    if (window.location.href.includes("code=")) {
      fetch('https://www.bungie.net/Platform/App/OAuth/Token/', {
        method: 'POST',
        headers: {
          'X-API-Key': process.env.REACT_APP_API_KEY,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${window.btoa(`${process.env.REACT_APP_CLIENT_ID}:${process.env.REACT_APP_CLIENT_SECRET}`)}`
        },
        body: new URLSearchParams({
          'client_id': process.env.REACT_APP_CLIENT_ID,
          'grant_type': "authorization_code",
          'code': authCode
        }).toString()
      }).then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        tokenData = data;
        console.log(data);
      })
    }

  }, [])


    return (
      <div className="App">
        
      </div>
    );
}

export default App;
