import React from 'react';
import RoomIcon from '@material-ui/icons/Room';
import './locationBox.scss';

const LocationBox = ({location}) => {
  return (
    <div className="location-box">
      <RoomIcon />
      <p className="location-text">{location}</p>
    </div>
  )
}
export default LocationBox;