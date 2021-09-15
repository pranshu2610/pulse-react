import React,{useState, useEffect} from 'react';
import {SearchBox} from '../searchbox/search-box';
import './details.scss'
import {API_ENDPOINT} from '../../helpers/APIRequest';
import {Button} from '@material-ui/core';

const Details = ({closeTheDetails,category}) =>{
  const [data, setData] = useState([]);
  const [searchFields, setSearchField]= useState('');
  const getNecessaryData = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    let url = API_ENDPOINT + `/home/user/${category}\n`
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        let resJSON = JSON.parse(result)
        setData(resJSON[category])})
      .catch(error => console.log('error', error));
  }

  useEffect(()=> {
    console.log("Called Once")
    getNecessaryData()
  },[])

  var filteredData = data;
  if (searchFields!=='') {
    if(category==="doctors") {
      filteredData = data.filter(item => item.Dr_name.toLowerCase().includes(searchFields.toLowerCase()))
    }
    else if(category==="hospitals") {
      filteredData = data.filter(item => item.Hpt_name.toLowerCase().includes(searchFields.toLowerCase()))
    }
    else if(category==="pharmacy") {
      filteredData = data.filter(item => item.Phar_name.toLowerCase().includes(searchFields.toLowerCase()))
    }
  }

  const name = category
  const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
  return (
  <div className="detail-canvas">
    <div className="detail-options">
      <p className="detail-title">List of {nameCapitalized}</p>
      <SearchBox
        placeholder={`Search for ${nameCapitalized}`}
        handleChanges={e=>setSearchField(e.target.value)}
      />
      <div className="detail-list">
      {
        filteredData.length && category==="doctors" ?
          filteredData.map(item => (
            <div className="detail-card">
              <div className="detail-inside">
                <p className="detail-name">{item.Dr_name}</p>
                {item.status==="True" ? <div className="dot active"/> : <div className="dot inactive"/>}
              </div>
              <p className="detail-subtitle">{item.Dr_type}</p>
              <p className="detail-relation">{item.Hpt_name}</p>
            </div>
          ))
        : null
      }
      {
        filteredData.length && category==="hospitals" ?
          filteredData.map(item => (
            <div className="detail-card">
              <div className="detail-inside">
                <p className="detail-name">{item.Hpt_name}</p>
                <div className="dot active"/>
              </div>
              <p className="detail-subtitle">{item.Hpt_speciality.length} Specialities</p>
              <p className="detail-relation">{item.Hpt_type}</p>
            </div>
          ))
        : null
      }
      {
        filteredData.length && category==="pharmacy" ?
          filteredData.map(item => (
            <div className="detail-card">
              <div className="detail-inside">
                <p className="detail-name">{item.Phar_name}</p>
              </div>
              <p className="detail-subtitle">{item.Phar_phone} {item.Phar_time}</p>
              <p className="detail-relation">{item.Phar_address}</p>
            </div>
          ))
        : null
      }
      </div>
      <div className="examine-buttons">
        <Button onClick={closeTheDetails} variant="outlined" color="secondary">
          Back to Dashboard
        </Button>
      </div>
    </div>
  </div>
)};


export default Details;