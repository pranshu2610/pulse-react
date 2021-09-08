import React from 'react';
import {ReactComponent as Test} from '../../assets/img/blood-test.svg';
import {ReactComponent as Distance} from '../../assets/img/distance.svg';
import {ReactComponent as Diamond} from '../../assets/img/diamond.svg';
import {ReactComponent as Gold} from '../../assets/img/gold.svg';
import './expenseCard.scss';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const ExpenseCard = ({filterParams,imgUrl,name,address,distance,type,test,price,benefit_tag}) => {
  return(
    <div className="expense-item">
      <div className="hospital-img" style={{backgroundImage: `url(${imgUrl})`}}>
        <div className={`hos-tag ${type}`} >
          {type==="elite" ? <Diamond className="hos-icon"/>:<Gold className="hos-icon"/>}
          <p className="hos-title">{capitalizeFirstLetter(type)}</p>
        </div>
      </div>
      <div className="hospital-detail">
        <p className="hospital-name">{name}</p>
        <p className="hospital-address">{address}</p>
        <div className="hospital-indicator">
          {
            filterParams.distance ? 
            <div className="indicator-item">
              <Distance className="indicator-icon"/>
              <p className="indicator-lable">{distance} Km</p>
            </div> : null
          }
          {
            filterParams.noOfTest ? 
            <div className="indicator-item">
              <Test className="indicator-icon"/>
              <p className="indicator-lable">{test}</p>
            </div> : null
          }
        </div>
        <p className="hospital-price">₹ {price}</p>
        {
          filterParams.banner ? 
          <div className="benefit-tag good">
            <p className="benefit-lable">{benefit_tag}</p>
          </div> : null
        }
      </div>
    </div>
  )
}
export default ExpenseCard;