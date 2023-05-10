import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import addImg from "../../assets/images/eae946efbbf74117a65d488206a09b63.png"
import axios from 'axios';
import moment from 'moment/moment';

const NewEvent = () => {
 
    const [dataCategories, setDataCategories] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [formData, setFormData] = useState({
      titleAr: '',
      titleEn: '',
      img: '',
      descriptionEn: '',
      descriptionAr: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime :''
    })
    useEffect(() => {
      axios.get(`https://otrok.invoacdmy.com/api/dashboard/category/index`)
        .then(response => {
          setDataCategories(response.data.Categories)
        }
        ).catch((err) => { console.log(err) })
  
      axios.get(`https://otrok.invoacdmy.com/api/dashboard/donationtype/index`)
        .then(response => {
          setDataType(response.data.Donationtypes)
          console.log(response)
        }
        ).catch((err) => { console.log(err) })
  
    }, [])
    const addFile = useRef(null)
    const addFileInput = useRef(null)
    const imageContentRef = useRef(null);
    const imageFirmRef = useRef(null);
    function handleLogo() {
      let inputFileEvent = document.querySelector(".input-file-js")
      inputFileEvent.click()
    }
    const [imageUrl, setImage] = useState(null)
    let previewUploadImage = (e) => {
      let file = e.target.files[0];
      if (!file) {
        return;
      }
      let preViewLink = URL.createObjectURL(file);
      setImage(preViewLink)
      setFormData(prevValue => {
        return {
          ...prevValue,
          'img': file
        }
      })
    }
    const onChangeHandler = e => {
  
      setFormData({ ...formData, [e.target.name]: e.target.value })
      console.log(formData, "form")

    }
    const addNewCase = new FormData();
    addNewCase.append("name_ar", formData.titleAr);
    addNewCase.append("name_en", formData.titleEn);
    addNewCase.append("description_ar", formData.descriptionAr);
    addNewCase.append("description_en", formData.descriptionEn);
    addNewCase.append("image", formData.img);
    addNewCase.append("start_date", formData.startDate);
    addNewCase.append("end_date", formData.endDate);
    addNewCase.append("start_time", formData.startTime);
    addNewCase.append("end_time", formData.endTime);

    const onSubmitHandler = (e) => {
    
      const toastId = toast.loading("please wait ... ")
      setTimeout(() => { toast.dismiss(toastId); }, 1000);
      e.preventDefault()
      axios.post("https://otrok.invoacdmy.com/api/dashboard/events/store", addNewCase, {
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
            <h1>Add New Event</h1>
          </div>
          <div className="bottom">
            <div className="left">
              <input className={`fileImg  input-file-js`} ref={(e) => {
                addFileInput.current = e
              }} id="input-file" name="img" type="file" onChange={(e) => { previewUploadImage(e) }} />
              {
                imageUrl == null ?
                  <>
                    <div ref={addFile} onClick={() => { handleLogo() }}>
                      <img className="img" ref={imageFirmRef} src={addImg} alt=" اضافه صورة للحاله" />
                    </div>
                  </>
                  :
                  <div ref={addFile} onClick={() => { handleLogo() }}>
                    <img className="img" ref={imageContentRef} src={imageUrl} alt="" />
                  </div>
              }
            </div>
            <div className="right">
              <form onSubmit={onSubmitHandler}>
    
  
                <div className="formInput" >
                  <label>Name of Event in Arabic</label>
                  <input
                    name="titleAr"
                    onChange={onChangeHandler}
                    value={formData.titleAr}
                  />
                </div>
  
                <div className="formInput" >
                  <label> Name of Event in English </label>
                  <input
                    name="titleEn"
                    value={formData.titleEn}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="formInput" >
                  <label> Description of Event in Arabic </label>
                  <input
                    name="descriptionAr"
                    value={formData.descriptionAr}
                    onChange={onChangeHandler}
                  />
                </div>
  
                <div className="formInput" >
                  <label>Description of Event in English</label>
                  <input
                    name="descriptionEn"
                    value={formData.descriptionEn}
                    onChange={onChangeHandler}
                  />
                </div>
                <div className="formInput" >
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={onChangeHandler}
                    value={formData.startDate}
                  />
                </div>
                <div className="formInput" >
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={onChangeHandler}
                    value={formData.endDate}
                  />
                </div>
                <div className="formInput" >
                  <label>Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    onChange={onChangeHandler}
                    value={formData.startTime}
                  />
                </div>
                <div className="formInput" >
                  <label>End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    onChange={onChangeHandler}
                    value={formData.endTime}
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
    );
}

export default NewEvent