import React,{useState, useEffect} from 'react';
import ChatMsg from '@mui-treasury/components/chatMsg/ChatMsg';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {Button,Checkbox} from '@material-ui/core';
import { useNeonCheckboxStyles } from '@mui-treasury/styles/checkbox/neon';
import {API_ENDPOINT} from '../../helpers/APIRequest';
import './filter.scss'

const Filter = ({
    transport,
    setTransport,
    elite,
    setElite,
    gold,
    setGold,
    silver,
    setSilver,
    noOfTest,
    setNoOfTest,
    distance,
    setDistance,
    banner,
    setBanner,
    closeTheFilter}) =>{
  const neonStyles = useNeonCheckboxStyles();
  return (
  <div className="detail-canvas">
    <div className="detail-options">
      <p className="detail-title" style={{marginTop: "20px"}}>Filter</p>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={transport}
            onChange={setTransport}
            classes={neonStyles}
            checkedIcon={<span />}
            icon={<span />}
          />
        }
        label="Include Transportation Charges (Ola, Uber approx.)"
      />
      <p className="detail-title" style={{marginTop: "20px"}}>Hospital Types</p>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={elite}
            onChange={setElite}
            classes={neonStyles}
            checkedIcon={<span />}
            icon={<span />}
          />
        }
        label="Elite"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={gold}
            onChange={setGold}
            classes={neonStyles}
            checkedIcon={<span />}
            icon={<span />}
          />
        }
        label="Gold"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={silver}
            onChange={setSilver}
            classes={neonStyles}
            checkedIcon={<span />}
            icon={<span />}
          />
        }
        label="Silver"
      />
      <p className="detail-title" style={{marginTop: "20px"}}>Indicators</p>
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={distance}
            onChange={setDistance}
            classes={neonStyles}
            checkedIcon={<span />}
            icon={<span />}
          />
        }
        label="Distance"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={noOfTest}
            onChange={setNoOfTest}
            classes={neonStyles}
            checkedIcon={<span />}
            icon={<span />}
          />
        }
        label="Number of Tests"
      />
      <FormControlLabel
        control={
          <Checkbox
            disableRipple
            checked={banner}
            onChange={setBanner}
            classes={neonStyles}
            checkedIcon={<span />}
            icon={<span />}
          />
        }
        label="Ratings and Feedback"
      />
      <div className="examine-buttons">
        <Button onClick={closeTheFilter} variant="outlined" color="secondary">
          Close
        </Button>
        <Button onClick={closeTheFilter} variant="outlined" color="primary">
          Apply
        </Button>
      </div>
    </div>
  </div>
)};


export default Filter;