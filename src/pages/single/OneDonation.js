import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { Link, useParams } from 'react-router-dom';
import DonationList from "../../components/table/DonationList";
const OneDonation = () => {
  const [oneDonationData, setOneDonationData] = useState({})
  const [creationDate,setCreationDate] = useState()
  const DonationId = useParams()


  useEffect(() => {
    axios.get(`https://otrok.invoacdmy.com/api/dashboard/donation/show/${DonationId.donationId}`)
      .then((response) => {
        setOneDonationData(response.data.donation[0])
        const formatter = new Intl.DateTimeFormat('en-GB', {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: 'numeric', minute: '2-digit', second: '2-digit',
          hourCycle: 'h12',
        });
        
        setCreationDate(
          formatter
            .format(
              new Date(response.data.donation[0]?.updated_at)
            )
        );
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
                <span className="itemKey"> Name: </span>
                <span className="itemValue"> {oneDonationData?.name}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Email: </span>
                <span className="itemValue"> {oneDonationData?.email}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">phone: </span>
                <span className="itemValue"> {oneDonationData?.phone}</span>
              </div>
              {oneDonationData?.address ?
              <div className="detailItem">
                <span className="itemKey">Address: </span>
                <span className="itemValue"> {oneDonationData?.address}</span>
              </div>
              :
              null
              }
               {oneDonationData?.city ?
              <div className="detailItem">
                <span className="itemKey">City: </span>
                <span className="itemValue"> {oneDonationData?.city}</span>
              </div>
              :
              null
              }
              <div className="detailItem">
                <span className="itemKey">Amount : </span>
                <span className="itemValue"> {oneDonationData?.amount} {oneDonationData?.amount_description}</span>
              </div>
            
             
              <div className="detailItem">
                <span className="itemKey">Donation Type Ar: </span>
                <span className="itemValue"> {oneDonationData?.donationtype?.name_ar}</span>
              </div>
             <div className="detailItem">
                <span className="itemKey">Donation Type En: </span>
                <span className="itemValue"> {oneDonationData?.donationtype?.name_en}</span>
              </div>
              {oneDonationData?.method ?
                <div className="detailItem">
                  <span className="itemKey">Method:</span>
                  <span className="itemValue">{oneDonationData?.method}</span>
                </div>
                 : 
                 null
                 }

                <div className="detailItem">
                  <span className="itemKey">Create at:</span>
                  <span className="itemValue">{creationDate}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Case Name :</span>
                  <span className="itemValue">{oneDonationData?.casee?.name_en}</span>
                </div>
             
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{oneDonationData?.status}</span>
                </div>
              </div>
            </div>

          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">All Case's Donations Transactions </h1>
          <DonationList />
        </div>
      </div>
    </div>
  );
};

export default OneDonation;