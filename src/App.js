import React, {useState} from 'react';
import './App.scss';
import Container from '@material-ui/core/Container';
import DashboardPage from './pages/dashboardPage/dashboardPage';
import EmergencyPage from './pages/emergencyPage/emergencyPage';
import Navbar from './components/navbar/navbar';

function App() {
  const [navOption,setNavOption] = useState(0)
  return (
    <Container disableGutters={true} maxWidth="md">
      {
        navOption===0 ?
        <DashboardPage/>
        : null
      }
      {
        navOption===1 ?
        <EmergencyPage />
        : null
      }
      {/*
      {
        navOption===2 ?
        
        : null
      } */}
      <div className="nav-div">
        <Navbar navOption={navOption} onNavPress={setNavOption}/>
      </div>
    </Container>
  );
}

export default App;
