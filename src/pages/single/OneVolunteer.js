import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navbar } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Chart from '../../components/chart/Chart'

const OneVolunteer = () => {
    const [volunteer, setVolunteer] = useState({})

    const volunteerId = useParams()
  
  
    useEffect(() => {
      axios.get(`https://otrok.invoacdmy.com/api/dashboard/volunteer/show/${volunteerId.volunteerId}`)
        .then((response) => {
          
          setVolunteer(response.data.volunteer)
        }).catch((err) => { console.log(err) })
  
    }, [])
   
    return (
      <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
      
          <div className="top">
            <div className="left">
             
              <h1 className="title">Information</h1>
              <div className="item">
              
                <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name  </span>
                  <span className="itemValue"> {volunteer?.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email: </span>
                  <span className="itemValue"> {volunteer?.email}</span>
                </div>
               
                <div className="detailItem">
                  <span className="itemKey">Phone: </span>
                  <span className="itemValue"> {volunteer?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address: </span>
                  <span className="itemValue"> {volunteer?.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">City: </span>
                  <span className="itemValue"> {volunteer?.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Age: </span>
                  <span className="itemValue"> {volunteer?.age}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Activity: </span>
                  <span className="itemValue"> {volunteer?.activity}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Volunteer Type: </span>
                  <span className="itemValue"> {volunteer?.volunteer_type}</span>
                </div>
                
                {volunteer?.num_of_members ? 
                <div className="detailItem">
                  <span className="itemKey">Number of members: </span>
                  <span className="itemValue"> {volunteer?.num_of_members}</span>
                </div>
                :
                null

                }
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

export default OneVolunteer