import './App.css';
import React, { useEffect, useState } from "react"
import BungieApiComponent from './components/BungieApiComponent'

function App() {

  const [authCode, setAuthCode] = useState(undefined)
  const [tokenData, setTokenData] = useState(undefined)

  function logIn() {
    window.location.replace(`https://www.bungie.net/en/OAuth/Authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code`)
  }

  useEffect(() => {

    if (window.location.href.includes("code=")) {
      var authCodeHref = window.location.href;
      setAuthCode(authCodeHref.split('code=')[1]);
    }

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
          'code': authCodeHref.split('code=')[1]
        }).toString()
      }).then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(function(data) {
        setTokenData(data)
        console.log(data);
      })
    }

  }, [])


    return (
      <div className="App">
        {authCode === undefined ? <button onClick={logIn}>Log In</button> : <BungieApiComponent membershipID={tokenData.membership_id}/>}
      </div>
    );
}

export default App;
