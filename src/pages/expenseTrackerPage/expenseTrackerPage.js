import React, { useState, useEffect } from 'react';
import ExpenseCard from '../../components/expenseCard/expenseCard';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {Button,Select} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {API_ENDPOINT} from '../../helpers/APIRequest';
import './expenseTrackerPage.scss';
import Filter from '../../components/filter/filter';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 130,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ExpensePage = () => {
  const [checkup, setCheckup] = useState("full_body")
  const [data, setData] = useState([])
  const [viewFilter,setFilter] = useState(false)
  const [elite,setElite] = useState(true);
  const [gold,setGold] = useState(true);
  const [silver,setSilver] = useState(true);
  const [transport,setTransport] = useState(false)
  const [noOfTest,setNoOfTest] = useState(true)
  const [distance,setDistance] = useState(true)
  const [banner,setBanner] = useState(true)
  const classes = useStyles();

  const handleChange = (event) => {
    console.log(event)
    setCheckup(event.target.value);
  };
  const getCostData = () => {
    console.log("HITTING SERVER")
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let reqInput = []
    if (checkup!=="full_body") {
      reqInput = [checkup]
    }
    var raw = JSON.stringify({
      "filters": reqInput
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://pulse-squad.herokuapp.com/home/user/cost/filters", requestOptions)
      .then(response => response.text())
      .then(result => {
        let resJSON = JSON.parse(result)
        setData(resJSON.filters)})
      .catch(error => console.log('error', error));
  }
  // if (!data.size) {
  //   getCostData()
  // }

  const generateCards = () => {
    let paramData = {
      distance: distance,
      noOfTest: noOfTest,
      banner: banner,
      transport: transport,
    }
    let resData =[]
    let hospitalNotToInclude = new Set()
    if (!elite) {
      hospitalNotToInclude.add("elite")
    }
    if (!gold) {
      hospitalNotToInclude.add("gold")
    }
    if (!silver) {
      hospitalNotToInclude.add("silver")
    }
    data.forEach(item => {
      if (!hospitalNotToInclude.has(item.Hpt_type)) {
        resData.push(
          <ExpenseCard
            filterParams={paramData}
            imgUrl={item.Hpt_image}
            name={item.Hpt_name}
            address={item.Hpt_address}
            distance={(item.distance/1000).toFixed(1)}
            type={item.Hpt_type}    
            test={item.Hpt_length}
            price={item.Hpt_cost.total}
            benefit_tag={"You'll Save 30%"}
          />
        )
      }
    })
    return resData;
  }
  useEffect(()=> {
    getCostData()
  },[checkup]);
  console.log(data)

  const cards = generateCards();
  return(
    <div className="expense-canvas">
      {
        viewFilter ? 
        <Filter 
          closeTheFilter={()=>setFilter(false)}
          transport={transport}
          setTransport={() => setTransport(!transport)}
          elite={elite}
          setElite={()=>setElite(!elite)}
          gold={gold}
          setGold={()=>setGold(!gold)}
          silver={silver}
          setSilver={() => setSilver(!silver)}
          noOfTest={noOfTest}
          setNoOfTest={() => setNoOfTest(!noOfTest)}
          distance={distance}
          setDistance={() => setDistance(!distance)}
          banner={banner}
          setBanner={() => setBanner(!banner)}
        /> 
        : null
      }
      <div className="expense-top">
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Checkup</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={checkup}
            onChange={handleChange}
          >
            <MenuItem value={"full_body"}>Full Body Checkup</MenuItem>
            <MenuItem value={"covid"}>COVID 19</MenuItem>
            <MenuItem value={"cardiac_system"}>ECG</MenuItem>
            <MenuItem value={"eye"}>Eyesight Checkup</MenuItem>
            {/* <MenuItem value={"custom"}>Custom</MenuItem> */}
          </Select>
        </FormControl>
        <Button variant="outlined" color="primary" onClick={()=>setFilter(true)}>
          Filter
        </Button>
      </div>
      <div className="expense-scroll">
      {cards}
      </div>
    </div>
  );
}

export default ExpensePage;