import "./../new/new.scss";
import styles from "./../new/neww.module.css";
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
import { useParams } from 'react-router-dom';
const UpdateCase = () => {
    const updateId = useParams()
    
    const [dataCategories, setDataCategories] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [dataFurniture,setDataFurniture] = useState([{
        amount: "",
        name_ar : "",
        name_en: ""
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
        numberOfCartons:''
    })

    const [arrayGenderEn,setArrayGenderEn] = useState([])
    const [arraySeasonEn,setArraySeasonEn] = useState([])
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

        axios.get(`https://otrok.invoacdmy.com/api/dashboard/case/show/${updateId.updateId}`)
            .then((response) => {
                setFormData({
                    titleAr: response.data.case.name_ar,
                    titleEn: response.data.case.name_en,
                    img: response.data.case.image,
                    descriptionEn: response.data.case.description_en,
                    descriptionAr: response.data.case.description_ar,
                    totalPrice: response.data.case.initial_amount,
                    caseTypeId: response.data.case.category_id,
                    donationTypeId: response.data.case.donationtype_id,
                    statusCase: response.data.case.status,
                    numberOfPeople:  response.data.case.initial_amount,
                    numberOfVolunteers: response.data.case.initial_amount,
                    numberOfCartons: response.data.case.initial_amount
                })
                if(response.data.case.donationtype_id === '4'){
                setArrayGenderEn(response.data.case.gender_en.split(","))
                setArraySeasonEn(response.data.case.type_en.split(","))
                setCheckedEnKind(response.data.case.gender_en.split(","))
                setCheckedEnSeasons(response.data.case.type_en.split(","))
                }
                if(response.data.case.donationtype_id === '5'){
                    setDataFurniture(response.data.case.item)
                    console.log(response.data.case.item)
                    response.data.case.item.map((item,index)=>{
                     document.getElementById(`ar-${index}`).value = item.name_ar
                    })
                }
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
      
  const addItem = () => {
    let newfield = 
        {
            amount: "",
            name_ar : "",
            name_en: ""
        }
  
    setDataFurniture([...dataFurniture, newfield])
  }
  
  const deleteItem = (index) => {
    let data = [...dataFurniture];
    data.splice(index, 1)
    setDataFurniture(data)
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
    data[index]['name_en'] = event.target.value;
    setDataFurniture(data);
    setArOptionValue('') 
    data[index]["name_ar"] = '';
    document.getElementById(`ar-${event.target.getAttribute('data-index')}`).value = ''
   }else {
    data[index]['name_en'] = event.target.value;
    console.log(dataFurniture)
    const ArOption = furnitureArOption.filter(opt => opt.value1 === event.target.value );
     setArOptionValue(ArOption[0].name)
    data[index]["name_ar"] = ArOption[0].name;
    document.getElementById(`ar-${event.target.getAttribute('data-index')}`).value = ArOption[0].name
    console.log( document.getElementById(`ar-${event.target.getAttribute('data-index')}`).value,'index')
    
   }
    
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
    setArrayGenderEn(updatedEnList)
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
    setArraySeasonEn(updatedEnList)
    console.log(updatedEnList)
  };

  
  
    const handleFormChange = (index, event) => {
      let data = [...dataFurniture];
      data[index]['amount'] = event.target.value;
      setDataFurniture(data);
      console.log(dataFurniture,'items')
   }


   const addNewCase = new FormData();
   addNewCase.append("name_ar", formData.titleAr);
   addNewCase.append("name_en", formData.titleEn);
   addNewCase.append("description_ar", formData.descriptionAr);
   addNewCase.append("description_en", formData.descriptionEn);
   if(imageUrl){
    addNewCase.append("image", formData.img);
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
       addNewCase.append(`items[${index}][name_en]`, item.name_en); 
       addNewCase.append(`items[${index}][name_ar]`, item.name_ar); 
       addNewCase.append(`items[${index}][amount]`, item.amount); 
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
    



    const onSubmitHandler = (e) => {
        console.log(formData.donationTypeId)
        console.log(formData)
        const toastId = toast.loading("Please wait... ")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post(`https://otrok.invoacdmy.com/api/dashboard/case/update/${updateId.updateId}`, addNewCase, {
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
                 <h1>Edit Case</h1>
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
                            <label> Name of Case in Arabic </label>
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
                                        <option value={category.id} key={category.id}>{category.name_en}</option>
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
                                        <option value={type.id} key={type.id} >{type.name_en}</option>
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
                                 
                                    <>
                                   <div className="form-group "> 
                                        <input 
                                         className="form-group_checklist" 
                                         type="checkbox" 
                                         checked={arrayGenderEn[0]  === 'men' || arrayGenderEn[1]  === 'men' || arrayGenderEn[2]  === 'men' ? true : false }
                                         name="men"
                                         id="men"
                                        value="men" 
                                         onChange={(e)=>{handleCheckedKind(e)}} />
                                        <label className="form-group_checklist_label" for="men" value="men">men</label>
                                    </div>
                                    <div className="form-group ">
                                        <input className="form-group_checklist"
                                         type="checkbox" 
                                         checked={arrayGenderEn[0]  === 'women' || arrayGenderEn[1]  === 'women' || arrayGenderEn[2]  === 'women' ? true : false }
                                         id="women"
                                         value="women"
                                         onChange={(e)=>{handleCheckedKind(e)}} />
                                        <label className="form-group_checklist_label" for="women" value="women">women</label>
                                    </div>
                                    <div className="form-group ">
                                        <input className="form-group_checklist"
                                         type="checkbox" 
                                         checked={arrayGenderEn[0]  === 'child' || arrayGenderEn[1]  === 'child' || arrayGenderEn[2]  === 'child' ? true : false }
                                         id="child" value="child"
                                         onChange={(e)=>{handleCheckedKind(e)}}
                                         />
                                        <label className="form-group_checklist_label" for="child" value="child">child</label>
                                    </div>
                                      
                                    </>
                              
                                </div>

                            
                                <div className="formInput d-flex" >
                                <div className="form-group "> 
                                        <input className="form-group_checklist"    checked={arraySeasonEn[0]  === 'summer' || arraySeasonEn[1]  === 'summer'  ? true : false } type="checkbox" id="summer" value="summer" onChange={(e)=>{handleCheckedSeasons(e)}} />
                                        <label className="form-group_checklist_label" for="summer" value="summer">summer</label>
                                    </div>
                                    <div className="form-group ">
                                        <input className="form-group_checklist" type="checkbox"   checked={arraySeasonEn[0]  === 'winter' || arraySeasonEn[1]  === 'winter'  ? true : false }  id="winter" value="winter" onChange={(e)=>{handleCheckedSeasons(e)}} />
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
                                        value={item.amount}
                                        onChange={event => handleFormChange(index, event)}
                                        />
                                        
                                    </div>
                                    <div className="formInput" >
                                    <select
                                        className="input select"
                                        name="name_en"
                                        data-index = {index}
                                        onChange={event => handleFurnitureChange(index, event)}
                                        value={item.name_en}
                                    
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
                                        name="name_ar"
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

        </div >
    );
};

export default UpdateCase;
