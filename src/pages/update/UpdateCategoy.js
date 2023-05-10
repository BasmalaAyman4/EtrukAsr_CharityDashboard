import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./../new/new.scss";
import "./../new/neww.module.css";
const UpdateCategoy = () => {
    const [file, setFile] = useState("");
    const updateId = useParams()
    console.log(updateId.updateId,"htg")
    //   const [dataCategories, setDataCategories] = useState([]);
    //   const [dataType, setDataType] = useState([]);
      const [formData, setFormData] = useState({
        nameEn: '',
        nameAr: '',
        img: '',
        descriptionEn: '',
        descriptionAr: '',
      })
      useEffect(() => {
        axios.get(`https://otrok.invoacdmy.com/api/dashboard/category/show/${updateId.updateCategoryId}`)
            .then((response) => {
                setFormData({
                    nameAr: response.data.Category.name_ar,
                    nameEn: response.data.Category.name_en,
                    img: response.data.Category.image,
                    descriptionEn: response.data.Category.description_en,
                    descriptionAr: response.data.Category.description_ar,
           
                })
             
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
        console.log(formData, "form")
        console.log(formData.paiedAmount)
      }
      const UpdateCategoyData = new FormData();
      UpdateCategoyData.append("name_ar", formData.nameAr);
      UpdateCategoyData.append("name_en", formData.nameEn);
      UpdateCategoyData.append("description_ar", formData.descriptionAr);
      UpdateCategoyData.append("description_en", formData.descriptionEn);
      if(imageUrl){
        UpdateCategoyData.append("image", formData.img);
    }
   
    
      
      const onSubmitHandler = (e) => {
      
        const toastId = toast.loading("please wait ... ")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/category/update/${updateId.updateCategoryId}`, UpdateCategoyData, {
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
              <div className="left ">
                <input className={`fileImg  input-file-js`} ref={(e) => {
                  addFileInput.current = e
                }} id="input-file" name="img" type="file" onChange={(e) => { previewUploadImage(e) }} />
                {
                  imageUrl == null ?
                    <>
                      <div ref={addFile} onClick={() => { handleLogo() }}>
                        <img className="img" ref={imageFirmRef} src={formData.img} alt="add pic" />
                      </div>
                    </>
                    :
                    <div ref={addFile} onClick={() => { handleLogo() }}>
                      <img className="img" ref={imageContentRef} src={imageUrl} alt="" />
                    </div>
                }
              </div>
              <div className="right mt-5">
                <form onSubmit={onSubmitHandler}>
                  {/* <div className="formInput">
                    <input
                      type="file"
                      id="file"
                      onChange={(e) => setFile(e.target.files[0])}
                      style={{ display: "none" }}
                    />
                  </div> */}
    
                  <div className="formInput" >
                    <label>Name of Category in Arabic</label>
                    <input
                      name="nameAr"
                      onChange={onChangeHandler}
                      value={formData.nameAr}
                    />
                  </div>
    
                  <div className="formInput" >
                    <label> Name of Category in English </label>
                    <input
                      name="nameEn"
                      value={formData.nameEn}
                      onChange={onChangeHandler}
                    />
                  </div>
               
                  <div className="formInput" >
                    <label> Description of Category in Arabic </label>
                    <input
                      name="descriptionAr"
                      value={formData.descriptionAr}
                      onChange={onChangeHandler}
                    />
                  </div>
    
                  <div className="formInput" >
                    <label>Description of Category in English</label>
                    <input
                      name="descriptionEn"
                      value={formData.descriptionEn}
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
      );
    
    
    
}

export default UpdateCategoy