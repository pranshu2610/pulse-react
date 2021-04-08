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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
      <div className="emergency-console">
        <Button size={"large"} classes={chubbyStyles}>Call an Ambulance</Button>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-label">Specify</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            onChange={handleChange}
          >
            <MenuItem value={"heart_attack"}>Heart Attack</MenuItem>
            <MenuItem value={"stroke"}>Stroke</MenuItem>
            <MenuItem value={"collapse"}>Collapse</MenuItem>
            <MenuItem value={"bleeding"}>Bleeding</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
export default EmergencyPage;