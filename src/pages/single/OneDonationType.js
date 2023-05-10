import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'
// import List from '../../components/table/Table'

const OneDonationType = () => {
   
    const [oneDonationType, setOneDonationType] = useState({})

    const donationTypeId = useParams()
  
  
    useEffect(() => {
      axios.get(`https://otrok.invoacdmy.com/api/dashboard/donationtype/show/${donationTypeId.donationId}`)
        .then((response) => {
          console.log(response.data.Donationtype)
          setOneDonationType(response.data.Donationtype)
        }).catch((err) => { console.log(err) })
  
    }, [])
   
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
      
          <div className="top">
            <div className="left">
              <Link to={`/editCategory/${oneDonationType.id}`} className="editButton">Edit</Link>
              <h1 className="title">Information</h1>
              <div className="item">
              
                <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name En: </span>
                  <span className="itemValue"> {oneDonationType?.name_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Name Ar: </span>
                  <span className="itemValue"> {oneDonationType?.name_ar}</span>
                </div>
  
                </div>
              </div>
  
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">Last Transactions</h1>
            {/* <List /> */}
          </div>
        </div>
      </div>
    );
  
}

export default OneDonationType