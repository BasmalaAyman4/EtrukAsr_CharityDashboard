import "./../new/new.scss";
import "./../new/neww.module.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import addImg from "../../assets/images/eae946efbbf74117a65d488206a09b63.png"
import { useParams } from 'react-router-dom';
import moment from "moment";
const UpdateEvent = () => {
    const updateId = useParams()
  
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
    

        axios.get(`https://otrok.invoacdmy.com/api/dashboard/events/show/${updateId.updateEventId}`)
            .then((response) => {
                setFormData({
                    titleAr: response.data.event.name_ar,
                    titleEn: response.data.event.name_en,
                    img: response.data.event.image,
                    descriptionEn: response.data.event.description_en,
                    descriptionAr: response.data.event.description_ar,
                    startDate: response.data.event.start_date,
                    endDate: response.data.event.end_date,
                    startTime: response.data.event.start_time,
                    endTime :response.data.event.end_time
                })
                console.log(response.data.event, "event")
                console.log(formData, "text")
            }).catch((err) => { console.log(err) })

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
        console.log(formData)
    }
    const UpdateEvent = new FormData();
    UpdateEvent.append("name_ar", formData.titleAr);
    UpdateEvent.append("name_en", formData.titleEn);
    UpdateEvent.append("description_ar", formData.descriptionAr);
    UpdateEvent.append("description_en", formData.descriptionEn);
    UpdateEvent.append("start_date", formData.startDate);
    UpdateEvent.append("end_date", formData.endDate);
    UpdateEvent.append("start_time",moment(formData.startTime,["HH:mm:ss"]).format("hh:mm"));
    UpdateEvent.append("end_time", moment(formData.endTime,["HH:mm:ss"]).format("hh:mm")); 
   
    if(imageUrl){
      UpdateEvent.append("image", formData.img);
    }
   
    const onSubmitHandler = (e) => {
        console.log(formData.donationTypeId)
        console.log(formData)
        const toastId = toast.loading("Please wait... ")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/events/update/${updateId.updateEventId}`, UpdateEvent, {
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
                 <h1>Edit Event</h1>
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
                                        <img className="img" ref={imageFirmRef} src={formData.img} alt=" اضافه صورة للحاله" />
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

        </div >
    );
};

export default UpdateEvent;