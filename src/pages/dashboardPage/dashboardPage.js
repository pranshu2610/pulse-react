import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { useGradientBtnStyles } from '@mui-treasury/styles/button/gradient';
import heart from '../../assets/img/heartbeat.png'
import convo from '../../assets/img/conversation.png'
import doc from '../../assets/img/doctor.png'
import hos from '../../assets/img/hospital.png'
import pre from '../../assets/img/prescription.jpg'
import IconButton from '../../components/iconButton/iconButton';
import LocationBox from '../../components/locationBox/locationBox';
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import SearchIcon from '@material-ui/icons/Search';
import './dashboardPage.scss'
import Examine from '../../components/examine/examine';
import Details from '../../components/details/details';

const userProfile = {
  name: "Rick Sanchez",
  location: "TT Nagar, Bhopal"
}
const DashboardPage = () => {
  const chubbyStyles = useGradientBtnStyles({ chubby: true });
  const [userName, setUserName] = useState(userProfile.name);
  const [location, setLocation] = useState(userProfile.location);
  const [viewExamine, setExamine] = useState(false);
  const [viewDetail, setDetail] = useState(false);
  return(
    <div className="dashboard-canvas">
      {
        viewExamine ? 
        <Examine closeTheExamine={()=>setExamine(false)}/>
        : null
      }
      {
        viewDetail ? 
        <Details closeTheDetails={()=>setDetail(false)} category={viewDetail}/>
        : null
      }
      <div className="dash-header">
        <IconButton icon={<SearchIcon/>}/>
        <LocationBox location={location}/>
        <IconButton icon={<NotificationsNoneOutlinedIcon/>}/>
      </div>
      <p className="large-sized-text">Hi, {userName}</p>
      <div className="dash-report">
        <p className="normal-sized-text">Health Status</p>
        <div className="dash-content">
          <img className="dash-img" src={heart} alt="heart"/>
          <p className="dash-img-text">Diagnose an Health Issue within 2 mins</p>
        </div>
        <div className="dash-content">
        <img className="dash-img" src={convo} alt="talk"/>
          <p className="dash-img-text">Answer simple questions to predict the probable disease</p>
        </div>
        <div className="dash-button">
          <Button onClick={()=>setExamine(true)} classes={chubbyStyles}>Test Now</Button>
        </div>
      </div> 
      <div className="dash-feature">
        <p className="normal-sized-text">What are you looking for?</p>
        <div className="feat-scrollable-div">
          <div className="feat-content" onClick={()=>setDetail("doctors")}>
            <img className="feat-img" src={doc} alt="doctors"/>
            <p className="small-sized-text">Doctors</p>
          </div>
          <div className="feat-content" onClick={()=>setDetail("hospitals")}>
            <img className="feat-img" src={hos} alt="hospital"/>
            <p className="small-sized-text">Hospitals</p>
          </div>
          <div className="feat-content" onClick={()=>setDetail("pharmacy")}>
            <img className="feat-img" src={pre} alt="pharmacy"/>
            <p className="small-sized-text">Pharmacy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DashboardPage;