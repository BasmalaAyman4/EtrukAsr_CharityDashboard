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
    axios.get(`https://otrok.invoacdmy.com/api/charity/case/show/${casesId.caseId}`,{
      headers: {
          "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
          "Content-Type": "multipart/form-data"

      }
  })
      .then((response) => {
        console.log(response.data?.case)
        setOneCaseData(response.data?.case)
        setOne(response.data?.case?.caseimage)
      }).catch((err) => { console.log(err) })

  }, [])


  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />

        <div className="top">
          <div className="left">
            <Link to={`/edit/${oneCaseData?.id}`} className="editButton">Edit</Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <Carousel  width={300} autoPlay interval="1000" transitionTime="1000" >
                {one && one.map((imgSrc, index) => (<img src={imgSrc?.image} key={index} alt="" />))}
              </Carousel>


              <div className="details">
                <div className="detailItem">
                  <span className="itemKey">Name En: </span>
                  <span className="itemValue"> {oneCaseData?.name_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Name Ar: </span>
                  <span className="itemValue"> {oneCaseData?.name_ar}</span>
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
                  <span className="itemValue">{oneCaseData?.description_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description Ar:</span>
                  <span className="itemValue">{oneCaseData?.description_ar}</span>
                </div>
                {oneCaseData?.donationtype_id === '1' ?
                 <div className="detailItem">
                 <span className="itemKey">Required Amount :</span>
                 <span className="itemValue">{oneCaseData?.initial_amount} LE</span>
               </div>
                :
                null
                }
                    {oneCaseData?.donationtype_id === '2' ?
                 <div className="detailItem">
                 <span className="itemKey">Required volunteer  :</span>
                 <span className="itemValue">{oneCaseData?.initial_amount} volunteer </span>
               </div>
                :
                null
                }
                  {oneCaseData?.donationtype_id === '3' ?
                 <div className="detailItem">
                 <span className="itemKey">Required cartoons :</span>
                 <span className="itemValue">{oneCaseData?.initial_amount} cartoon </span>
               </div>
                :
                null
                }
                 {oneCaseData?.donationtype_id === '4' ?
                 <div className="detailItem">
                 <span className="itemKey">Required for persons :</span>
                 <span className="itemValue">{oneCaseData?.initial_amount} person </span>
               </div>
                :
                null
                }
                  {oneCaseData?.donationtype_id === '5' ?
                 <div className="detailItem">
                 <span className="itemKey">Required Items  :</span>
                 <span className="itemValue">{oneCaseData?.initial_amount} items </span>
               </div>
                :
                null
                }
                <div className="detailItem">
                  <span className="itemKey">Paied Amount:</span>
                  <span className="itemValue">{oneCaseData?.paied_amount}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Remaining Amount:</span>
                  <span className="itemValue">{oneCaseData?.remaining_amount}</span>
                </div>
                {oneCaseData?.file ?
                <div className="detailItem">
                  <span className="itemKey">File Attachment :</span>
                  <span className="itemValue"><Link to={oneCaseData?.file}>click here</Link></span>
                </div>
                
                :
                null
                } 
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{oneCaseData?.status}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey"> User :</span>
                  <span className="itemValue">{oneCaseData?.user?.email}</span>
                </div>
              </div>
            </div>

          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div>
        </div>
      
      </div>
    </div>
  );
};

export default OneCase;