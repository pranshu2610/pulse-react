// ()=> window.open("https://www.google.com/maps/dir/?api=1&origin=Bakers+Home+Vindhyanagar&destination=Hospital&travelmode=car", "_blank")
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SimpleMap from '../../components/googlemap/googlemap';
import {API_ENDPOINT} from '../../helpers/APIRequest';
import './emergencyPage.scss';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const EmergencyPage = () => {
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const [age, setAge] = React.useState('');
  const [origin, setOrigin]  = useState(["23.237696056902493","77.40107993996217"]);
  const [hospitals,setHospitals] = useState([])

  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const getNearbyHospitals = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let requestParam = "emergency"
    if (age.length) {
      requestParam = age
    }
    var raw = JSON.stringify({
      "speciality": requestParam,
      "origin_lati": origin[0],
      "origin_long": origin[1]
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    let url = API_ENDPOINT + "/home/user/hospitals";
    fetch(url, requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result);
        let jsonRes = JSON.parse(result)
        if (jsonRes.hospitals) {
          setHospitals(jsonRes.hospitals)
        }
      })
      .catch(error => console.log('error', error));
  }
  console.log(hospitals)
  return(
    <div className="emergency-canvas">
      <div className="google-map-div">
        <SimpleMap origin={origin}/>
      </div>
      <div className="emergency-console">
        <div className="console-canvas">
          <div className="console-item">
            <Button size={"large"} classes={chubbyStyles} onClick={() => getNearbyHospitals()}>View Hospitals</Button>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Specify</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                // variant='outlined'
              >
                <MenuItem value={"cardiology"}>Heart Attack</MenuItem>
                <MenuItem value={"neurology"}>Stroke</MenuItem>
                <MenuItem value={"physical_therapy"}>Collapse</MenuItem>
                <MenuItem value={"first_aid"}>First Aid</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="hospital-scroll">
          {
            hospitals.length ? 
            hospitals.map(item => (
              <div className="hospital-item" onClick={()=> window.open(`https://www.google.com/maps/dir/?api=1&origin=${origin[0]},${origin[1]}&destination=${item.Hpt_location[0]},${item.Hpt_location[1]}&travelmode=car`, "_blank")}>
                <p className="hospital-title">{item.Hpt_name}</p>
                <div className="hospital-stats-div">
                  <p className="hospital-stats">{(item.distance/1000).toFixed(1)} <span className="unit">Km</span></p>
                  <p className="hospital-stats">{(item.durations/60).toFixed(1)} <span className="unit">Min</span></p>
                </div>
              </div>
            ))
            :
            null
          }
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmergencyPage;