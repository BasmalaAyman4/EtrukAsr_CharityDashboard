import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateDonationType = () => {
    const [file, setFile] = useState("");
    const updateId = useParams()
   
   
      const [formData, setFormData] = useState({
        nameEn: '',
        nameAr: '',
      })
      useEffect(() => {
        axios.get(`https://otrok.invoacdmy.com/api/dashboard/donationtype/show/${updateId.updateTypeId}`)
            .then((response) => {
                setFormData({
                    nameAr: response.data.Donationtype.name_ar,
                    nameEn: response.data.Donationtype.name_en,
                 
                })
             
            }).catch((err) => { console.log(err) })
    
      }, [])
  
     
      const onChangeHandler = e => {
    
        setFormData({ ...formData, [e.target.name]: e.target.value })
        
      }
      const UpdateCategoyData = new FormData();
      UpdateCategoyData.append("name_ar", formData.nameAr);
      UpdateCategoyData.append("name_en", formData.nameEn);
     
 
   
    
      
      const onSubmitHandler = (e) => {
      
        const toastId = toast.loading("please wait ... ")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/donationtype/update/${updateId.updateTypeId}`, UpdateCategoyData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(response => {
            toast.success(response.data.message)
            console.log(response)
          }
          ).catch((err) => { toast.error(err.response.data.message) })
    
      }
  return (
    <div className="new">
    <Sidebar />
    <div className="newContainer">
      <Navbar />
      <div className="top">
           <h1>Edit Category</h1>
         </div>
      <div className="bottom">
     
        <div className="right mt-5">
          <form onSubmit={onSubmitHandler}>
        

            <div className="formInput" >
              <label>Name of Donation type in Arabic</label>
              <input
                name="nameAr"
                onChange={onChangeHandler}
                value={formData.nameAr}
              />
            </div>

            <div className="formInput" >
              <label> Name of Donation type in English </label>
              <input
                name="nameEn"
                value={formData.nameEn}
                onChange={onChangeHandler}
              />
            </div>
         
            <button type="submit">
              Send
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  </div>
  )
}

export default UpdateDonationType