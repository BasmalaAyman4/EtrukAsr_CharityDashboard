
import "./new.scss"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState, useRef } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
const NewCategory = () => {
    const [formData, setFormData] = useState({
        nameAr: '',
        nameEn: '',

    })
    const onChangeHandler = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData, "form")
    }
    const addNewCase = new FormData();
    addNewCase.append("name_ar", formData.nameAr);
    addNewCase.append("name_en", formData.nameEn);
    const onSubmitHandler = (e) => {
        const toastId = toast.loading("please waiting ...")
        setTimeout(() => { toast.dismiss(toastId); }, 1000);
        e.preventDefault()
        axios.post("https://otrok.invoacdmy.com/api/dashboard/donationtype/store", addNewCase, {
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
   
          <div className="right">
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
      
    );
};

export default NewCategory;
