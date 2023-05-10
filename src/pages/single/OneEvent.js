import React from 'react'
import "./single.scss";
import Chart from '../../components/chart/Chart'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import moment from 'moment/moment'
import DataOfVoulenteerJoin from '../../components/datatable/DataOfVoulenteerJoin';

const OneEvent = () => {
    const [event, setEvent] = useState({})
 
    const eventId = useParams()
     
    
    useEffect(() => {
      axios.get(`https://otrok.invoacdmy.com/api/dashboard/events/show/${eventId.eventId}`)
        .then((response) => {
          
          setEvent(response.data.event)
   
        }).catch((err) => { console.log(err) })
  
    }, [])

    return (
        <div className="single">
        <Sidebar />
        <div className="singleContainer">
          <Navbar />
      
          <div className="top">
            <div className="left">
              <Link to={`/editEvent/${event.id}`} className="editButton">Edit</Link>
              <h1 className="title">Information</h1>
              <div className="item">
                <img
                  src={event.image}
                  alt=""
                  className="itemImg"
                />
                <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name En: </span>
                  <span className="itemValue"> {event?.name_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Name Ar: </span>
                  <span className="itemValue"> {event?.name_ar}</span>
                </div>
                <div className="detailItem">
                    <span className="itemKey">Description En:</span>
                    <span className="itemValue">{event?.description_en}</span>
                  </div>
                  <div className="detailItem">
                    <span className="itemKey">Description Ar:</span>
                    <span className="itemValue">{event?.description_ar}</span>
                  </div>
                <div className="detailItem">
                  <span className="itemKey">Start Date: </span>
                  <span className="itemValue"> {event?.start_date}</span>
                </div>
               <div className="detailItem">
                  <span className="itemKey">End Date: </span>
                  <span className="itemValue"> {event?.end_date}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start Time: </span>
                  <span className="itemValue"> {moment(event?.start_time, ["HH:mm:ss"]).format("hh:mm a")}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">End Time: </span>
                  <span className="itemValue"> {moment(event?.end_time, ["HH:mm:ss"]).format("hh:mm a")}</span>
                </div>
           
       
                </div>
              </div>
  
            </div>
            <div className="right">
              <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
            </div>
          </div>
          <div className="bottom">
            <h1 className="title">All Voulenteers who are join in this event </h1>
              <DataOfVoulenteerJoin />
          </div>
        </div>
      </div>
    );
}

export default OneEvent