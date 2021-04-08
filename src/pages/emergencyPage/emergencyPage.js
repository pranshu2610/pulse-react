// https://www.google.com/maps/dir/?api=1&origin=Bakers+Home+Vindhyanagar&destination=Hospital&travelmode=car
import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './emergencyPage.scss'
import SimpleMap from '../../components/googlemap/googlemap';
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
  const classes = useStyles();
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return(
    <div className="emergency-canvas">
      <div className="google-map-div">
        <SimpleMap/>
      </div>
      <div className="emergency-console">
        <div className="console-canvas">

          <div className="console-item">
            <Button size={"large"} classes={chubbyStyles} onClick={()=> window.open("https://www.google.com/maps/dir/?api=1&origin=Bakers+Home+Vindhyanagar&destination=Hospital&travelmode=car", "_blank")}>Call an Ambulance</Button>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Specify</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
                // variant='outlined'
              >
                <MenuItem value={"heart_attack"}>Heart Attack</MenuItem>
                <MenuItem value={"stroke"}>Stroke</MenuItem>
                <MenuItem value={"collapse"}>Collapse</MenuItem>
                <MenuItem value={"bleeding"}>Bleeding</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EmergencyPage;