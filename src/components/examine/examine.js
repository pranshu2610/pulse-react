import React,{useState, useEffect} from 'react';
import './examine.scss'
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button,Checkbox} from '@material-ui/core';
import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';
import {API_ENDPOINT} from '../../helpers/APIRequest';

const sampleData = ["chills","chest_pain","high_fever","pain_behind_the_eyes","constipation"];

const setRawData = (options) => {
  let a = {}
  options.forEach(item => {
    a[item] = false
  })
  return a
}
const messageStack = []
const Examine = ({closeTheExamine}) =>{
  const [userOptions, setUserOptions] = useState(setRawData(sampleData))
  const [step,setStep] = useState(0)
  const [userID, setUserID] = useState(0)
  const [showRes,setShowRes] = useState()
  const neonStyles = useNeonCheckboxStyles();

  const pushMessageStack = (msg) => {
    messageStack.push(msg)
  }
  useEffect(() => {
    var objDiv = document.getElementsByClassName("examine-chatbox");
    objDiv[0].scrollTop = objDiv[0].scrollHeight;
    console.log("SCROLLED to Bottom")
  }, [step])

  const sendMessageToServer = async () => {
    let requestBody = []
    for (let [option, checked] of Object.entries(userOptions)) {
      if(checked) {
        requestBody.push(option)
      }
    }
    pushMessageStack({sender: "user", content: requestBody})

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    console.log("INPUT",requestBody);
    var raw = JSON.stringify({
      "username": userID,
      "symptoms": requestBody
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let url = API_ENDPOINT + "/home/user/Examine"
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        let jsonRes = JSON.parse(result)
        if (jsonRes.symptoms) {
          setUserOptions(setRawData(jsonRes.symptoms))
        }
        else {
          setShowRes(jsonRes)
        }
      })
      .catch(error => console.log('error', error));
    if (requestBody.length) {
      pushMessageStack({sender: "server", content: ['We select more symptoms from options below?']})
    }
  }

  const setCheckboxData = (option) => {
    let obj = JSON.parse(JSON.stringify(userOptions)) 
    obj[option] = !obj[option]    
    setUserOptions(obj)
  }

  const displayCheckboxes = () => {
    let a = []
    for (let [option, checked] of Object.entries(userOptions)) {
      a.push(<FormControlLabel
              control={
                <Checkbox
                  disableRipple
                  checked={checked}
                  onChange={() => setCheckboxData(option)}
                  classes={neonStyles}
                  checkedIcon={<span />}
                  icon={<span />}
                />
              }
              label={option}
            />)
    }
    return a
  }

  const displayMessageStack = () => {
    let msgStack = []
    if (messageStack.length) {
      messageStack.forEach(msg => {
        if (msg.sender==='server') {
          msgStack.push(
          <ChatMsg
            avatar={''}
            messages={msg.content}
          />)
        }
        else {
          msgStack.push(
          <ChatMsg
            side={'right'}
            messages={msg.content}
          />)
        }
      })
    }
    return msgStack
  }

  if (!messageStack.length) {
    pushMessageStack({sender: 'server', content: ['Hi Rick! How are you?','Can you tell us how do you feel rightnow?']})
  }
  if (!userID) {
    var ID = Math.random().toString(36).substr(2, 9);
    setUserID(ID)
  }
  console.log("RENDER")
  let checkboxes = displayCheckboxes();
  let messages = displayMessageStack();

  return (
  <div className="examine-canvas">
    <div className={`examine-chatbox ${showRes ? 'result' : null}`}>
      {messages}
    </div>
    {
      !showRes ? 
      <div className="examine-options">
        <p className="options-title">{checkboxes.length>1 ? "Select the Options" : "Are you suffering from this symptom? You can also Tap Next to skip"}</p>
        {checkboxes}
        <div className="examine-buttons">
        <Button onClick={closeTheExamine} variant="outlined" color="secondary">
          Close
        </Button>
        <Button onClick={() => {sendMessageToServer(); setStep(step+1)}} variant="outlined" color="primary">
          Next
        </Button>
        </div>
      </div>
      :
      <div className="examine-options result">
        <p className="options-title">You are likely suffering from {showRes.predicted_diseases[0]} with {(showRes.probabilities[0]*100).toFixed(2)}% chances</p>
        <p className="options-content">{showRes.description}</p>
        {showRes.precautions.map(item => (
          <p className="options-content">✨ {item}</p>
        ))
        }
        <div className="examine-buttons">
        <Button onClick={closeTheExamine} variant="outlined" color="secondary">
          Go back to Dashboard
        </Button>
        </div>
      </div>
    }
  </div>
)};


export default Examine;