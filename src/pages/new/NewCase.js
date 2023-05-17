import "./new.scss";
import "./new.css";
import styles from "./neww.module.css"
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
import plus from "./../../assets/icons/+.svg"
import minus from "./../../assets/icons/mi.svg"
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
const NewCase = () => {
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [file, setFile] = useState("");
  const [dataCategories, setDataCategories] = useState([]);
  const [dataType, setDataType] = useState([]);
  const [dataFurniture,setDataFurniture] = useState([{
    nameEnItem:"",
    nameArItem:"",
    amountItem:""
}])



  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    img: '',
    descriptionEn: '',
    descriptionAr: '',
    totalPrice: '',
    caseTypeId: '',
    donationTypeId: '',
    statusCase :'',
    numberOfPeople:'',
    numberOfVolunteers:'',
    numberOfCartons:'',
    file: ''

    })
  useEffect(() => {
    axios.get(`https://otrok.invoacdmy.com/api/user/category/index?lang=en`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
        "Content-Type": "multipart/form-data"

      }
    }).then(response => {
      setDataCategories(response.data.Categories)
    }
    ).catch((err) => { console.log(err) })

    axios.get(`https://otrok.invoacdmy.com/api/user/donation/donation/types?lang=ar`, {
      headers: {
        "Content-Type": "multipart/form-data"

      }
    }).then(response => {
      setDataType(response.data.Donationtypes)
      console.log(response.data.Donationtypes,"lll")
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

  const [imageUrl, setImage] = useState([])
  const [fileImage, setFileImages] = useState()

  let previewUploadImage = (e) => {
    let files = e.target.files
    setFileImages(e.target.files)

    if (!files) {
      return;
    }

    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    console.log(ImagesArray);
    setImage([...imageUrl, ...ImagesArray]);



    setFormData(prevValue => {
      return {
        ...prevValue,
        'img': files
      }
    })

    console.log(formData)
  }
  const onChangeHandler = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  let previewUploadFile = (e) => {
    let file = e.target.files[0];
    if (!file) {
      return;
    }
    setFormData(prevValue => {
      return {
        ...prevValue,
        file: file
      }
    })
  }
  function deleteFile(e) {
    e.preventDefault()
    setImage([])
  }

  
  const addItem = () => {
    let newfield = {
    nameEnItem:"",
    nameArItem:"",
    amountItem:""}
  
    setDataFurniture([...dataFurniture, newfield])
  }
  
  const deleteItem = (index) => {
    let data = [...dataFurniture];
    data.splice(index, 1)
    setDataFurniture(data)
  }

   
 
  const [checkedEnKind, setCheckedEnKind] = useState([]);

  function handleCheckedKind(e){
    var updatedEnList = [...checkedEnKind];

    if (e.target.checked) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      updatedEnList = [...checkedEnKind, e.target.value];
    } else {
       updatedEnList.splice(checkedEnKind.indexOf(e.target.value), 1);  
    }
    setCheckedEnKind(updatedEnList);
  };

  const [checkedEnSeasons, setCheckedEnSeasons] = useState([]);
  function handleCheckedSeasons(e){
    var updatedEnList = [...checkedEnSeasons];

    if (e.target.checked) {
      setFormData({ ...formData, [e.target.name]: e.target.value })
      updatedEnList = [...checkedEnSeasons, e.target.value];
    } else {
       updatedEnList.splice(checkedEnSeasons.indexOf(e.target.value), 1);  
    }
    setCheckedEnSeasons(updatedEnList);
    console.log(updatedEnList)
  };


  const handleFormChange = (index, event) => {
    let data = [...dataFurniture];
    data[index][event.target.name] = event.target.value;
    setDataFurniture(data);
    console.log(dataFurniture,'items')
 }
  const addNewCase = new FormData();
  addNewCase.append("name_ar", formData.titleAr);
  addNewCase.append("name_en", formData.titleEn);
  addNewCase.append("description_ar", formData.descriptionAr);
  addNewCase.append("description_en", formData.descriptionEn);
  if (formData.file) {
    addNewCase.append("file", formData.file);
  }
  if (fileImage) {

    [...fileImage].forEach((item, index) => {
      addNewCase.append("images[]", item);

    })
  }
  addNewCase.append("donationtype_id", formData.donationTypeId);
  addNewCase.append("category_id", formData.caseTypeId);
  addNewCase.append("status", formData.statusCase);
   if(formData.donationTypeId === "1"){
    addNewCase.append("initial_amount", formData.totalPrice);
   }
   if(formData.donationTypeId === "2"){
    addNewCase.append("initial_amount", formData.numberOfVolunteers);
   }
   if(formData.donationTypeId === "3"){
    addNewCase.append("initial_amount", formData.numberOfCartons);
   }
  if(formData.donationTypeId === "5"){
    dataFurniture.map((item,index)=>{
      addNewCase.append(`items[${index}][name_en]`, item.nameEnItem); 
      addNewCase.append(`items[${index}][name_ar]`, item.nameArItem); 
      addNewCase.append(`items[${index}][amount]`, item.amountItem); 
    })
  }
  if(formData.donationTypeId === "4"){
    const listKindAr =[]
    const listKindEn = []
    const listSeasonsAr =[]
    const listSeasonsEn = []
    checkedEnKind.map((item,index)=>{


      if(item === 'men'){
        if (!listKindEn.includes('men')) {
          listKindEn.push('men');
        }
        if (!listKindAr.includes('رجالي')) {
          listKindAr.push('رجالي');
        }
    
      }
      if(item === 'women'){
        if (!listKindEn.includes('women')) {
          listKindEn.push('women');
        }
        if (!listKindAr.includes('حريمي')) {
          listKindAr.push('حريمي');
        }
      }
      if(item === 'child'){
        if (!listKindEn.includes('child')) {
          listKindEn.push('child');
        }
        if (!listKindAr.includes('اطفالي')) {
          listKindAr.push('اطفالي');
        }
      }
      })
      checkedEnSeasons.map((item,index)=>{
        if(item === 'summer'){
            listSeasonsEn.push('summer')
            listSeasonsAr.push('صيفي')
        }
        if(item === 'winter'){
          listSeasonsEn.push('winter')
          listSeasonsAr.push('شتوي')
        }
        })
    addNewCase.append("gender_en",listKindEn);
    addNewCase.append("gender_ar",listKindAr);
    addNewCase.append("type_en",listSeasonsEn);
    addNewCase.append("type_ar",listSeasonsAr);
    addNewCase.append("initial_amount",formData.numberOfPeople);
  
  }
   
   const furnitureEnOption =
   [
    {
     name : "chair",
     value : "chair",

    },
    {
      name : "bed",
      value : "bed",
    },
    {
      name : "table",
      value : "table",
    },
    {
      name : "sofa",
      value : "sofa",
     },
      {
      name : "refrigerator",
      value : "refrigerator",
     },
     {
      name : "cooker",
      value : "cooker",
     },
     {
      name : "washing machine",
      value : "washing machine",
     },
     {
      name : "fan",
      value : "fan",
     },
    ]
   const furnitureArOption =
   [
    {
     name : "كرسي",
     value : "كرسي",
     value1: "chair"
    },
    {
      name : "سرير",
      value :"سرير",
      value1: "bed"
    },
    {
      name :  "منضدة",
      value : "منضدة",
      value1: "table"
    },
    {
      name :  "اريكة",
      value : "اريكة",
      value1: "sofa"
     },
      {
      name :"ثلاجة",
      value : "ثلاجة",
      value1: "refrigerator"
     },
     {
      name :"بوتجاز",
      value : "بوتجاز",
      value1: "cooker"
     },
     {
      name :  "غسالة",
      value : "غسالة",
      value1: "washing machine"
     },
     {
      name : "مروحة",
      value : "مروحة",
      value1: "fan"
     },
    ]

  const [arOptionValue,setArOptionValue] = useState()
  function handleFurnitureChange(index, event){

    let data = [...dataFurniture];
    
   if(event.target.value === ''){
    data[index][event.target.name] = event.target.value;
    setDataFurniture(data);
    setArOptionValue('') 
    data[index]["nameArItem"] = '';
    document.getElementById(`ar-${event.target.getAttribute('data-index')}`).value = ''
   }else {
    data[index][event.target.name] = event.target.value;
    console.log(dataFurniture)
    const ArOption = furnitureArOption.filter(opt => opt.value1 === event.target.value );
     setArOptionValue(ArOption[0].name)
    data[index]["nameArItem"] = ArOption[0].name;
    document.getElementById(`ar-${event.target.getAttribute('data-index')}`).value = ArOption[0].name
    console.log( document.getElementById(`ar-${event.target.getAttribute('data-index')}`).value,'index')
    
   }
    
  }


  const onSubmitHandler = (e) => {
  
    const toastId = toast.loading("please wait ... ")
    setTimeout(() => { toast.dismiss(toastId); }, 1000);
    e.preventDefault()
    axios.post("https://otrok.invoacdmy.com/api/user/case/store", addNewCase, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem('tokenC')}`,
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
          <h1>Add New Case</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <input className={`fileImg  input-file-js`} ref={(e) => {
              addFileInput.current = e
            }} id="input-file" multiple name="img" type="file" onChange={(e) => { previewUploadImage(e) }} />
            {

              imageUrl.length === 0 ?
                <>
                  <div ref={addFile} onClick={() => { handleLogo() }}>
                    <img className="img" ref={imageFirmRef} src={addImg} alt=" اضافه صورة للحاله" />
                  </div>
                </>
                :
                <>
                  <Carousel width={400} autoPlay interval="1000" transitionTime="1000" >

                    {imageUrl.length > 0 &&
                      imageUrl.map((item, index) => {
                        return (
                          <div ref={addFile} onClick={() => { handleLogo() }}>
                            <img width={50} height={50} className="img" ref={imageContentRef} src={item} alt="" />
                          </div>

                        );
                      })}

                  </Carousel>
                  <button className='btn' type="button" onClick={(e) => deleteFile(e)}>
                    delete
                  </button>
                </>
            }

          </div>
          <div className="right">
            <form onSubmit={onSubmitHandler}>
  

              <div className="formInput" >
                <label>Name of Case in Arabic</label>
                <input
                  name="titleAr"
                  onChange={onChangeHandler}
                  value={formData.titleAr}
                />
              </div>

              <div className="formInput" >
                <label> Name of Case in English </label>
                <input
                  name="titleEn"
                  value={formData.titleEn}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="formInput" >
                <label> Description of case in Arabic </label>
                <input
                  name="descriptionAr"
                  value={formData.descriptionAr}
                  onChange={onChangeHandler}
                />
              </div>
 
              <div className="formInput" >
                <label>Description of case in English</label>
                <input
                  name="descriptionEn"
                  value={formData.descriptionEn}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="formInput" >
                  <select
                    className="input select"
                    name="statusCase"
                    onChange={onChangeHandler}
                    value={formData.statusCase}
                  >
                    <option  value=''> status</option>                
                    <option value='pending' >pending</option>
                    <option value='accepted'>accepted</option>
                    <option value='published'>published</option>
                    <option value='rejected'>rejected</option>
                   
                                    
                  </select>
                </div>
              <div className="formInput" >
                <select
                  className="input select"
                  name="caseTypeId"
                  onChange={onChangeHandler}
                  value={formData.caseTypeId}
                >
                  <option >Case Type</option>
                  {dataCategories && dataCategories.map(category =>
                    <option value={category.id} key={category.id}>{category.name}</option>
                  )}
                </select>
              </div>

              <div className="formInput" >
                <select
                  className="input select"
                  name="donationTypeId"
                  onChange={onChangeHandler}
                  value={formData.donationTypeId}
                >
                  <option > Donation Type</option>
                  {dataType && dataType.map(type =>
                    <option value={type.id} key={type.id} >{type.name}</option>
                  )}
                </select>
              </div>
          
                {formData?.donationTypeId === '1' ? 
                <div className="formInput" >
                    <label>Required Amount of Money</label>
                    <input
                      name="totalPrice"
                      type='number'
                      onChange={onChangeHandler}
                      value={formData.totalPrice}
                    />
                </div>
                :
                null
                }
                  {formData?.donationTypeId === '2' ? 
                <div className="formInput" >
                    <label>Required Amount of volunteers</label>
                    <input
                      name="numberOfVolunteers"
                      type='number'
                      onChange={onChangeHandler}
                      value={formData.numberOfVolunteers}
                    />
                </div>
                :
                null
                }
                  {formData?.donationTypeId === '3' ? 
                <div className="formInput" >
                    <label>Required Amount of cartons</label>
                    <input
                      name="numberOfCartons"
                      type='number'
                      onChange={onChangeHandler}
                      value={formData.numberOfCartons}
                    />
                </div>
                :
                null
                }
                 {formData?.donationTypeId === '4' ? 
                 <>
                  <div className="formInput" >
                    <label>Number of people</label>
                    <input
                      name="numberOfPeople"
                      type='number'
                      onChange={onChangeHandler}
                      value={formData.numberOfPeople}
                    />
                </div>
                <div className="formInput d-flex" >
                  <div className="form-group "> 
                        <input className="form-group_checklist" type="checkbox" name="men" id="men" value="men" onChange={(e)=>{handleCheckedKind(e)}} />
                        <label className="form-group_checklist_label" for="men" value="men">men</label>
                    </div>
                    <div className="form-group ">
                        <input className="form-group_checklist" type="checkbox" id="women" value="women" onChange={(e)=>{handleCheckedKind(e)}} />
                        <label className="form-group_checklist_label" for="women" value="women">women</label>
                    </div>
                    <div className="form-group ">
                        <input className="form-group_checklist" type="checkbox" id="child" value="child" onChange={(e)=>{handleCheckedKind(e)}}/>
                        <label className="form-group_checklist_label" for="child" value="child">child</label>
                    </div>
               
                </div>
                <div className="formInput d-flex" >
                  <div className="form-group "> 
                        <input className="form-group_checklist" type="checkbox" id="summer" value="summer" onChange={(e)=>{handleCheckedSeasons(e)}} />
                        <label className="form-group_checklist_label" for="summer" value="summer">summer</label>
                    </div>
                    <div className="form-group ">
                        <input className="form-group_checklist" type="checkbox" id="winter" value="winter" onChange={(e)=>{handleCheckedSeasons(e)}} />
                        <label className="form-group_checklist_label" for="winter" value="winter">winter</label>
                    </div>
                   
               
                </div>
                </>
                :
                null
                }
              
                 {formData?.donationTypeId === '5' ? 
                 <>
             
           {dataFurniture&&dataFurniture.map((item,index)=>(
              <>
                  <div className="formInput" >
                    <label>Required Amount of item</label>
                    <input
                      name="amountItem"
                      type='number'
                      value={item.amountItem}
                      onChange={event => handleFormChange(index, event)}
                    />
                    
                   </div>
                  <div className="formInput" >
                  <select
                    className="input select"
                    name="nameEnItem"
                    data-index = {index}
                    onChange={event => handleFurnitureChange(index, event)}
                    value={item.nameEnItem}
                  
                  >
                    <option  value=''> Item En Description</option>                
                    {furnitureEnOption && furnitureEnOption.map(opt =>
                    <option value={opt.value} name={opt.name} key={opt.value} >{opt.value}</option>
                  )}
                                    
                  </select>
                </div>
                <div className="formInput " >
                  <select
                    id = {`ar-${index}`}
                    className="input select"
                    name="nameArItem"
                    // value={arOptionValue}
                    disabled
                  >
                    <option  value=''> Item Ar Description</option>                
                    {furnitureArOption && furnitureArOption.map(opt =>
                    <option value={opt.value} name={opt.name} key={opt.value} >{opt.name}</option>
                  )}
                            
                  </select>
                </div>

                {
                  index > 0 || dataFurniture.length === 2 ?
                    <div className="formInput" >
                              <button type='button' onClick={()=>{deleteItem(index)}} className={`${styles["add-uncle-button"]}`} ><img width={20} src={minus} alt="" />Delete item</button>
                    </div>
                    :
                    <>
                    </>

            }
                     
                        
                     </>
          ))
      }
             
                
                <div className="formInput" >
                  <button type="button" className={`${styles["add-uncle-button"]}`} onClick={()=>{addItem()}}><img src={plus} alt="" /> Add item</button>
                  </div>
                  </>
                :
                null
                }
              
              <div className="formInput" >
              <button type="submit">
                Send
              </button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default NewCase;


// import React from 'react'
// import { useState } from 'react';

// const NewCase = () => {
//   const allOption2 = [
//     {
//       name: "op1",
//       value: "option1"
//     },
//     {
//       name: "op2",
//       value: "option2"
//     },
//     {
//       name: "op3",
//       value: "option3"
//     },
//     {
//       name: "op4",
//       value: "option4"
//     }
//   ];
//   const [select1, setSelect1] = useState("Dev");
//   const filterOption2 = allOption2.filter((i) => {
//     return (
//       (select1 === "Dev" && i.value === "option1") ||
//       (select1 === "Staging" && i.value !== "option4") ||
//       select1 === "Prod"
//     );
  
//   });
//   console.log(select1)
//   return (
//     <div className="App">
//       <select name="env" id="env" onChange={(e) => setSelect1(e.target.value)}>
//         <option value="Dev">Dev</option>
//         <option value="Staging">Staging</option>
//         <option value="Prod">Prod</option>
//       </select>
//       <select name="region" id="region" onClick={(e)=>(console.log(e.target.value,'hii'))}> 
//         {filterOption2.map((op) => (
//           <option key={select1 + op.value} value={op.value}>
//             {op.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }




// export default NewCase