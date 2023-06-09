import React, { useEffect, useRef, useState } from 'react'
import style from "./UpdateProfile.module.css";
import { Button, Form } from 'react-bootstrap';
import PhoneInput from 'react-phone-number-input';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import imgNull from './../../assets/images/eae946efbbf74117a65d488206a09b63.png'
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import './../list/list.scss'
import { Margin } from '@mui/icons-material';
const UpdateProfile = () => {
      
    const [dataCases, setDataCases] = useState([]);
    const [dataDonation, setDataDonation] = useState([]);
   
    const [formData, setFormData] = useState({
        img: '',
        nameEn: '',
        nameAr:'',
        email: '',
        phone: '',
        address: '',
        descriptionEn:'',
        descriptionAr:''
        

    })
    useEffect(() => {
        axios.get(`https://otrok.invoacdmy.com/api/charity/profile/show`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then((response) => {
                setFormData({
                    nameEn: response.data.charity.name_en,
                    nameAr: response.data.charity.name_ar,
                    email: response.data.charity.email,
                    address: response.data.charity.address,
                    phone: response.data.charity.phone,
                    
                    descriptionAr:'',
                    descriptionEn:''
                })
                setImage(response.data.charity.image)
            }).catch((err) => { console.log(err) })

        axios.get(`https://otrok.invoacdmy.com/api/user/profile/cases`, {
            headers: {
                "Authorization": `Bearer  ${localStorage.getItem('tokenC')}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                setDataCases(response.data.cases)
            }
            ).catch((err) => { console.log(err) })

        axios.get(`https://otrok.invoacdmy.com/api/user/profile/donations`, {
            headers: {
                "Authorization": `Bearer  ${localStorage.getItem('tokenC')}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                setDataDonation(response.data.donations)

            }
            ).catch((err) => { console.log(err) })

    }, [])
    function handleLogo() {
        let inputFileEvent = document.querySelector(".input-file-js")
        inputFileEvent.click()
    }
    const onChangeHandlerPhone = data => {
        setFormData({ ...formData, phone: data })
        console.log(formData)
    }

    const onChangeHandler = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const addFile = useRef(null)
    const addFileInput = useRef(null)
    const imageContentRef = useRef(null);
    const imageFirmRef = useRef(null);
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

    const storeProfile = new FormData();
    storeProfile.append("name_en", formData.nameEn);
    storeProfile.append("name_ar", formData.nameAr);
    storeProfile.append("address", formData.address);
    storeProfile.append("phone", formData.phone);
    if(formData.img){
      storeProfile.append("image", formData.img);
    }
    if(formData.descriptionAr){
        storeProfile.append("description_ar", formData.descriptionAr);
    }
    if(formData.descriptionEn){
        storeProfile.append("description_en", formData.descriptionEn);
    }
    

    const onSubmitHandler = (e) => {
        const toastId = toast.loading("please wait... ")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post("https://otrok.invoacdmy.com/api/charity/profile/update", storeProfile, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                toast.success(response.data.message)

            }
            ).catch((err) => { toast.error(err.response.data.message) })

    }
  


  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar />
      <div className={style.login}>
                    <p className={style.loginPara}>تعديل الحساب</p>
                    <div >
                        <Form >
                            <div className={`${style.im} text-center`}>
                                <input className={`${style.fileImg}  input-file-js`} ref={(e) => {
                                    addFileInput.current = e
                                }} id="input-file" name="img" type="file" onChange={(e) => { previewUploadImage(e) }} />
                                {
                                    imageUrl == null ?
                                        <>
                                            <div ref={addFile} onClick={() => { handleLogo() }}>
                                                <img className={`${style.img}`} ref={imageFirmRef} src={imgNull} alt="" />
                                            </div>

                                        </>
                                        :
                                        <div ref={addFile} onClick={() => { handleLogo() }}>
                                            <img className={`${style.img}`} ref={imageContentRef} src={imageUrl} alt="" />
                                        </div>
                                }
                            </div>

                            <Form.Group className="mb-3 mt-5" controlId="email">
                                    <Form.Control style={{width:'93%' , Margin: 'auto'}} name="email" autoComplete="off" className={`${style.inputBig}`} placeholder='Email Address' value={formData.email} />

                                </Form.Group>
                            <div className={style.userName}>
                          
                                <Form.Group className="mb-3" controlId="name" >
                                    <Form.Control name="nameEn" className={`${style.input}`} placeholder='Name in Arabic' onChange={onChangeHandler} value={formData.nameEn} />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="name" >
                                    <Form.Control name="nameAr" className={`${style.input}`} placeholder='Name in English' onChange={onChangeHandler} value={formData.nameAr} />

                                </Form.Group>

                                <Form.Group className="mb-3" controlId="descriptionAr">
                                    <Form.Control name="descriptionAr" autoComplete="off" className={`${style.input}`} placeholder='Description in Arabic' onChange={onChangeHandler} value={formData.descriptionAr} />

                                </Form.Group>
                                <Form.Group className="mb-3" controlId="descriptionEn">
                                    <Form.Control name="descriptionEn" autoComplete="off" className={`${style.input}`} placeholder='Description in English' onChange={onChangeHandler} value={formData.descriptionEn} />

                                </Form.Group>
                               
                                <Form.Group className="mb-3" controlId="address">
                                    <Form.Control name="address" autoComplete="off" className={`${style.input}`} placeholder='Address' onChange={onChangeHandler} value={formData.address} />

                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="phone">
                                    <div class={style.inputGroupp}>
                                        <PhoneInput
                                            defaultCountry="EG"
                                            international
                                          
                                            value={formData.phone}
                                            name="phone"
                                            onChange={onChangeHandlerPhone}
                                            className={` ${style.PhoneInputInput} ${style.PhoneInput}  ${style.input}`} />
                                    </div>
                                </Form.Group>
                               
                                
                            </div>
                            <Button className={style.signup__btn} type="submit" onClick={onSubmitHandler}>
                                Edit profile
                            </Button>

                        </Form>
                    </div>
                </div>
                <ToastContainer />
    </div>
  </div>
    
  )
}

export default UpdateProfile