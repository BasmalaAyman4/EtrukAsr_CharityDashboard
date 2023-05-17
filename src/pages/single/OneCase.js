import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import DonationList from "../../components/table/DonationList";
import { Carousel } from "react-responsive-carousel";
const OneCase = () => {
  const [oneCaseData, setOneCaseData] = useState({})
  const [one, setOne] = useState([])
  const casesId = useParams()


  useEffect(() => {
    axios.get(`https://otrok.invoacdmy.com/api/user/case/show/${casesId.caseId}`, {
      headers: {

        "Content-Type": "multipart/form-data"
      }
    })
      .then((response) => {
        console.log(response.data.case, "kkkkk")
        setOneCaseData(response.data?.case)
        setOne(response.data.case?.caseimage)
      }).catch((err) => { console.log(err) })

  }, [])
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top">
          <div className="left">
            <Link to={`/edit/${oneCaseData.id}`} className="editButton">Edit</Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <Carousel width={400} autoPlay interval="1000" transitionTime="1000" >
                {one && one.map((imgSrc, index) => (<img src={imgSrc?.image} key={index} alt="" />))}
              </Carousel>


              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name En: </span>
                  <span className="itemValue"> {oneCaseData?.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Name Ar: </span>
                  <span className="itemValue"> {oneCaseData?.name}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category Ar: </span>
                  <span className="itemValue"> {oneCaseData?.category?.name_ar}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category En: </span>
                  <span className="itemValue"> {oneCaseData?.category?.name_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Donation Type Ar: </span>
                  <span className="itemValue"> {oneCaseData?.donationtype?.name_ar}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Donation Type En: </span>
                  <span className="itemValue"> {oneCaseData?.donationtype?.name_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description En:</span>
                  <span className="itemValue">{oneCaseData?.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description Ar:</span>
                  <span className="itemValue">{oneCaseData?.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Required Amount :</span>
                  <span className="itemValue">{oneCaseData?.initial_amount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Paied Amount:</span>
                  <span className="itemValue">{oneCaseData?.paied_amount}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Remaining Amount:</span>
                  <span className="itemValue">{oneCaseData?.remaining_amount}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{oneCaseData?.status}</span>
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

export default OneCase;