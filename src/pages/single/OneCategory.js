import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
// import List from "../../components/table/Table";
import { useEffect, useState, useRef } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import { Link, useParams } from 'react-router-dom';
const OneCategory = () => {
  const [oneCategoryData, setOneCategoryData] = useState({})

  const categoryId = useParams()


  useEffect(() => {
    axios.get(`https://otrok.invoacdmy.com/api/dashboard/category/show/${categoryId.categoryId}`)
      .then((response) => {
        console.log(response.data.Category)
        setOneCategoryData(response.data.Category)
      }).catch((err) => { console.log(err) })

  }, [])
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
    
        <div className="top">
          <div className="left">
            <Link to={`/editCategory/${oneCategoryData.id}`} className="editButton">Edit</Link>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={oneCategoryData.image}
                alt=""
                className="itemImg"
              />
              <div className="details">
              <div className="detailItem">
                <span className="itemKey">Name En: </span>
                <span className="itemValue"> {oneCategoryData?.name_en}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Name Ar: </span>
                <span className="itemValue"> {oneCategoryData?.name_ar}</span>
              </div>
     
                <div className="detailItem">
                  <span className="itemKey">Description En:</span>
                  <span className="itemValue">{oneCategoryData?.description_en}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description Ar:</span>
                  <span className="itemValue">{oneCategoryData?.description_ar}</span>
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
};

export default OneCategory;