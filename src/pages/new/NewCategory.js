
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import {  useState, useRef } from "react";
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
import "./new.scss"
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import addImg from "../../assets/images/eae946efbbf74117a65d488206a09b63.png"

const NewCategory = () => {
      
  const [file, setFile] = useState("");
//   const [dataCategories, setDataCategories] = useState([]);
//   const [dataType, setDataType] = useState([]);
  const [formData, setFormData] = useState({
    nameEn: '',
    nameAr: '',
    img: '',
    descriptionEn: '',
    descriptionAr: '',
  })
//   useEffect(() => {
//     axios.get(`http://otrok.invoacdmy.com/api/dashboard/category/index`)
//       .then(response => {
//         setDataCategories(response.data.Categories)
//       }
//       ).catch((err) => { console.log(err) })

//     axios.get(`http://otrok.invoacdmy.com/api/dashboard/donationtype/index`)
//       .then(response => {
//         setDataType(response.data.Donationtypes)
//         console.log(response)
//       }
//       ).catch((err) => { console.log(err) })

//   }, [])
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
  const addNewCategory = new FormData();
  addNewCategory.append("name_ar", formData.nameAr);
  addNewCategory.append("name_en", formData.nameEn);
  addNewCategory.append("description_ar", formData.descriptionAr);
  addNewCategory.append("description_en", formData.descriptionEn);
  addNewCategory.append("image", formData.img);
  
  const onSubmitHandler = (e) => {
  
    const toastId = toast.loading("please wait ... ")
    setTimeout(() => { toast.dismiss(toastId); }, 1000);
    e.preventDefault()
    axios.post("https://otrok.invoacdmy.com/api/dashboard/category/store", addNewCategory, {
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
          <h1>Add New Category</h1>
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
                    <img className="img" ref={imageFirmRef} src={addImg} alt="add pic" />
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





    // const [formData, setFormData] = useState({
    //     titleAr: '',
    //     titleEn: '',

    // })
    // const onChangeHandler = e => {

    //     setFormData({ ...formData, [e.target.name]: e.target.value })
    //     console.log(formData, "form")
    // }
    // const addNewCase = new FormData();
    // addNewCase.append("name_ar", formData.titleAr);
    // addNewCase.append("name_en", formData.titleEn);
    // const onSubmitHandler = (e) => {
    //     const toastId = toast.loading("...انتظر قليلا")
    //     setTimeout(() => { toast.dismiss(toastId); }, 1000);
    //     e.preventDefault()
    //     axios.post("http://otrok.invoacdmy.com/api/dashboard/category/store", addNewCase, {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     })
    //         .then(response => {
    //             toast.success(response.data.message)
    //             console.log(response)
    //         }
    //         ).catch((err) => { toast.error(err.response.data.message) })

    // }
    // return (
    //     <div className={`${style.new}`}>
    //         <Sidebar />
    //         <div className={`${style.newContainer}`}>
    //             <Navbar />
    //             <div className={`${style.topCase}`}>
    //                 <h1>Add New Category</h1>
    //             </div>
    //             <Form className={`${style.bottomCase}`} onSubmit={onSubmitHandler}>
    //                 <div className={`${style.rightCategory}`}>

    //                     <Form.Group className="mb-3" controlId="formBasicEmail" >
    //                         <Form.Control name="titleAr" placeholder="نوع الحالة بالعربي" className={`${style.input} ${style.inputCategory}`} onChange={onChangeHandler} value={formData.titleAr} />
    //                     </Form.Group>
    //                     <Form.Group className="mb-3" controlId="formBasicEmail" >
    //                         <Form.Control name="titleEn" placeholder="    نوع الحالة بالانجيزية" className={`${style.input} ${style.inputCategory}`} onChange={onChangeHandler} value={formData.titleEn} />
    //                     </Form.Group>
    //                 </div>
    //                 <Button type="submit" className={`${style.btn}`}>
    //                     اضافة الان
    //                 </Button>

    //             </Form>

    //         </div>
    //         <ToastContainer />
    //     </div >
    // );
};

export default NewCategory;
