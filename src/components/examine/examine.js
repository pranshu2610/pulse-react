import React,{useState, useEffect} from 'react';
import './examine.scss'
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button,Checkbox} from '@material-ui/core';
import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';
import {APIRequestHelper} from '../../helpers/APIRequest';

const sampleData = ["chills","runny_nose","Mild Fever","Vommiting","Fatigue"];

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
  const neonStyles = useNeonCheckboxStyles();

  const pushMessageStack = (msg) => {
    messageStack.push(msg)
  }

  const sendMessageToServer = async () => {
    let requestBody = []
    for (let [option, checked] of Object.entries(userOptions)) {
      if(checked) {
        requestBody.push(option)
      }
    }
    pushMessageStack({sender: "user", content: requestBody})

      // fetch(`https://08e1a4433d39.ngrok.io/`, {
      //   headers : { 
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json'
      //    }
  
      // })
      //   .then(response => response.json())
      //   .then(data => console.log(data));

      // http://08e1a4433d39.ngrok.io/api/v1/users/create
    // let responseJSON = await APIRequestHelper.post('/api/v1/users/create',{
    //   username: "user",
    //   symptoms: requestBody
    // })
    // let responseJSON = await APIRequestHelper.post('/api/v1/users/create')
    // console.log(responseJSON)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "username": "Pranshu",
      "symptoms": requestBody
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch("http://08e1a4433d39.ngrok.io/home/user/Examine", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
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
  console.log("RENDER")
  let checkboxes = displayCheckboxes();
  let messages = displayMessageStack();

  return (
  <div className="examine-canvas">
    <div className="examine-chatbox">
      {messages}
    </div>
    <div className="examine-options">
      <p className="options-title">Select the Options</p>
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
  </div>
)};


export default Examine;