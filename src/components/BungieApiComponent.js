import React, { useState, useEffect } from 'react';
import axios from 'axios';

const INTELLECT = 144602215;
const RESILIENCE = 392767087;
const DISCIPLINE = 1735777505;
const RECOVERY = 1943323491;
const MOBILITY = 2996146975;
const STRENGTH = 4244567218;

const HELMET = 3448274439;
const ARMS = 3551918588;
const CHEST = 14239492;
const LEG = 20886954;
const CLASS = 1585787867;

const ARTIFICE_ARMOR = 3727270518;

const INTELLECT_MOD = 2724608735;
const MINOR_INTELLECT_MOD = 3897511453;
const ARTIFICE_INTELLECT_MOD = 3160845295;

const RESILIENCE_MOD = 1180408010;
const MINOR_RESILIENCE_MOD = 2532323436;
const ARTIFICE_RESILIENCE_MOD = 199176566;

const DISCIPLINE_MOD = 1435557120;
const MINOR_DISCIPLINE_MOD = 4021790309;
const ARTIFICE_DISCIPLINE_MOD = 617569843;

const RECOVERY_MOD = 4204488676;
const MINOR_RECOVERY_MOD = 1237786518;
const ARTIFICE_RECOVERY_MOD = 539459624;

const MOBILITY_MOD = 4183296050;
const MINOR_MOBILITY_MOD = 1703647492;
const ARTIFICE_MOBILITY_MOD = 2322202118;

const STRENGTH_MOD = 4287799666;
const MINOR_STRENGTH_MOD = 2639422088;
const ARTIFICE_STRENGTH_MOD = 2507624050;

function BungieApiComponent({membershipID, token}) {

  const [data, setData] = useState(null)
  const [userName, setUserName] = useState(null)

  const equipment_dict = {
    Helmets: [],
    Arms: [],
    Chest: [],
    Legs: [],
    Class: []
  }

  function itemInstanceCall(item_instance) {
    return axios.get('https://www.bungie.net/Platform/Destiny2/1/Profile/4611686018441343959/Item/' + item_instance + '/?components=304,305,300,307', {
      headers: {
        "X-API-Key": process.env.REACT_APP_API_KEY
      },
      responseType: "json"
    })
  }
  
  useEffect(() => {

    axios.get('https://www.bungie.net/Platform/User/GetMembershipsById/' + membershipID + '/1/', {
      headers: {
        "X-API-Key": process.env.REACT_APP_API_KEY,
        "Authorization": "Bearer " + token
      },
      responseType: "json"
    }).then((response) => {
      setUserName(response.data.Response.bungieNetUser.displayName)
    }).catch(error => {
      console.error(error);
    });

    let item_instance_calls = [itemInstanceCall('6917530024284244307'), itemInstanceCall('6917529457637024711'), itemInstanceCall('6917530023065128848'), itemInstanceCall('6917530024166539356'), itemInstanceCall('6917529765855650806'), itemInstanceCall('6917530023636892379'), itemInstanceCall('6917530024281389326')]

    Promise.all(item_instance_calls).then((responses) => {
      responses.forEach(response => {
          var response_data = response.data.Response;
          var response_item_data = response_data.item.data;
          var response_item_instance = response_data.instance.data;
          var response_stats = response_data.stats.data.stats;
          var response_item_sockets = response_data.sockets.data.sockets;
  
          var is_artifice = false;
  
          let armor_stats = {
            Intellect: 0,
            Resilience: 0,
            Discipline: 0,
            Recovery: 0,
            Mobility: 0,
            Strength: 0
          }
  
          // gather base stats for items without mods
          for (const key in response_stats) {
            switch(key) {
              case INTELLECT.toString():
                armor_stats.Intellect = response_stats[key].value
  
                if (response_item_sockets.some(mod => mod.plugHash === INTELLECT_MOD)) {
                  armor_stats.Intellect = armor_stats.Intellect - 10;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === MINOR_INTELLECT_MOD)) {
                  armor_stats.Intellect = armor_stats.Intellect - 5;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === ARTIFICE_INTELLECT_MOD)) {
                  armor_stats.Intellect = armor_stats.Intellect - 3;
                }
                
                break;
                
              case RESILIENCE.toString():
                armor_stats.Resilience = response_stats[key].value
  
                if (response_item_sockets.some(mod => mod.plugHash === RESILIENCE_MOD)) {
                  armor_stats.Resilience = armor_stats.Resilience - 10;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === MINOR_RESILIENCE_MOD)) {
                  armor_stats.Resilience = armor_stats.Resilience - 5;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === ARTIFICE_RESILIENCE_MOD)) {
                  armor_stats.Resilience = armor_stats.Resilience - 3;
                }
  
                break;
  
              case DISCIPLINE.toString():
                armor_stats.Discipline = response_stats[key].value
  
                if (response_item_sockets.some(mod => mod.plugHash === DISCIPLINE_MOD)) {
                  armor_stats.Discipline = armor_stats.Discipline - 10;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === MINOR_DISCIPLINE_MOD)) {
                  armor_stats.Discipline = armor_stats.Discipline - 5;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === ARTIFICE_DISCIPLINE_MOD)) {
                  armor_stats.Discipline = armor_stats.Discipline - 3;
                }
  
                break;
  
              case RECOVERY.toString():
                armor_stats.Recovery = response_stats[key].value
  
                if (response_item_sockets.some(mod => mod.plugHash === RECOVERY_MOD)) {
                  armor_stats.Recovery = armor_stats.Recovery - 10;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === MINOR_RECOVERY_MOD)) {
                  armor_stats.Recovery = armor_stats.Recovery - 5;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === ARTIFICE_RECOVERY_MOD)) {
                  armor_stats.Recovery = armor_stats.Recovery - 3;
                }
  
                break;
  
              case MOBILITY.toString():
                armor_stats.Mobility = response_stats[key].value
  
                if (response_item_sockets.some(mod => mod.plugHash === MOBILITY_MOD)) {
                  armor_stats.Mobility = armor_stats.Mobility - 10;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === MINOR_MOBILITY_MOD)) {
                  armor_stats.Mobility = armor_stats.Mobility - 5;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === ARTIFICE_MOBILITY_MOD)) {
                  armor_stats.Mobility = armor_stats.Mobility - 3;
                }
  
                break;
  
              case STRENGTH.toString():
                armor_stats.Strength = response_stats[key].value
  
                if (response_item_sockets.some(mod => mod.plugHash === STRENGTH_MOD)) {
                  armor_stats.Strength = armor_stats.Strength - 10;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === MINOR_STRENGTH_MOD)) {
                  armor_stats.Strength = armor_stats.Strength - 5;
                }
  
                if (response_item_sockets.some(mod => mod.plugHash === ARTIFICE_STRENGTH_MOD)) {
                  armor_stats.Strength = armor_stats.Strength - 3;
                }
  
                break;
            }
          }
  
          if (response_item_sockets.some(mod => mod.plugHash === ARTIFICE_ARMOR)) {
            is_artifice = true;
          }
  
          let armor_item = {
            ItemInstance: response_item_data.itemInstanceId,
            ItemHash: response_item_data.itemHash,
            EnergyCapacity: response_item_instance.energy.energyCapacity,
            OverrideStyleItemHash: response_item_data.overrideStyleItemHash,
            Artifice: is_artifice,
            Stats: armor_stats
          }
  
          switch(response_item_data.bucketHash) {
            case HELMET:
              equipment_dict.Helmets.push(armor_item);
              break;
            case ARMS:
              equipment_dict.Arms.push(armor_item);
              break;
            case CHEST:
              equipment_dict.Chest.push(armor_item);
              break;
            case LEG:
              equipment_dict.Legs.push(armor_item);
              break;
            case CLASS:
              equipment_dict.Class.push(armor_item);
              break;
          }

          setData(equipment_dict);
      })
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  return (
    <div className='App'>
        { data ? 
          <div>
            Hello, {userName}
            <br />
            Helmets:
            <ul>
              {
                [data.Helmets].map((item) => {
                  return <li>{JSON.stringify(item)}</li>
                })
              }
            </ul>
            Arms:
            <ul>
              {
                [data.Arms].map((item) => {
                  return <li>{JSON.stringify(item)}</li>
                })
              }
            </ul>
            Chest:
            <ul>
              {
                [data.Chest].map((item) => {
                  return <li>{JSON.stringify(item)}</li>
                })
              }
            </ul>
            Legs:
            <ul>
              {
                [data.Legs].map((item) => {
                  return <li>{JSON.stringify(item)}</li>
                })
              }
            </ul>
            Class:
            <ul>
              {
                [data.Class].map((item) => {
                  return <li>{JSON.stringify(item)}</li>
                })
              }
            </ul>
          </div>
          : <div>Loading...</div> }
    </div>
  );
}

export default BungieApiComponent;
