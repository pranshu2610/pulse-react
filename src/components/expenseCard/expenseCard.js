import React from 'react';
import {ReactComponent as Test} from '../../assets/img/blood-test.svg';
import {ReactComponent as Distance} from '../../assets/img/distance.svg';
import {ReactComponent as Diamond} from '../../assets/img/diamond.svg';
import {ReactComponent as Gold} from '../../assets/img/gold.svg';
import './expenseCard.scss';

const ExpenseCard = ({imgUrl,name,address,distance,type,test,price,benefit_tag}) => {
  return(
    <div className="expense-item">
      <div className="hospital-img" style={{backgroundImage: `url(${imgUrl})`}}>
        <div className={`hos-tag ${type}`} >
          {type==="elite" ? <Diamond className="hos-icon"/>:<Gold className="hos-icon"/>}
          <p className="hos-title">{type}</p>
        </div>
      </div>
      <div className="hospital-detail">
        <p className="hospital-name">{name}</p>
        <p className="hospital-address">{address}</p>
        <div className="hospital-indicator">
          <div className="indicator-item">
            <Distance className="indicator-icon"/>
            <p className="indicator-lable">{distance} Km</p>
          </div>
          <div className="indicator-item">
            <Test className="indicator-icon"/>
            <p className="indicator-lable">{test}</p>
          </div>
        </div>
        <p className="hospital-price">₹ {price}</p>
        <div className="benefit-tag good">
          <p className="benefit-lable">{benefit_tag}</p>
        </div>
      </div>
    </div>
  )
}
export default ExpenseCard;