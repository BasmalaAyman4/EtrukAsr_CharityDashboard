import React, { useState, useContext } from 'react'
import style from './Login.module.css'
import styles from './../../components/sidebar/Sidebar.module.css'
import {BiUser} from "react-icons/bi"
import {  useNavigate } from 'react-router-dom';
import { Form} from 'react-bootstrap';
import {RiLockPasswordLine} from "react-icons/ri"
import axios from 'axios';
import { toast } from 'react-toastify'
import { ToastContainer } from "react-toastify";
export default function Login() {


    const navigate = useNavigate();
 
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const validPass = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData
    const [formError, setFormError] = useState({})

    const onChangeHandler = e => {

        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)


    }
     
 
    function handleErrors() {

        let err = {}

        if (formData.email === '') {
            err.email = "البريد الالكتروني مطلوب";
        } else if (!validEmail.test(email)) {
            err.email = "بريد غير صحيح";
        }
        if (formData.password === '') {
            err.password = "كلمه السر مطلوبه"
        }
        setFormError({ ...err })
    }

    const reqLoginData = {
        email: formData.email ,
        password: formData.password ,
       
      }
      
      const delay = ms => new Promise(res => setTimeout(res, ms));
      const handleRedirect = async () => {
              await delay(7000);
           
          if(localStorage.getItem("token")){
              navigate("/")
              window.location.reload();
            
          }else {
              navigate("/login") 
          }
       }



    function handleSubmitLogin(e){
        console.log(reqLoginData)
        const toastId =   toast.loading("Please wait...")
        setTimeout(() => {toast.dismiss(toastId);}, 1000);
        e.preventDefault()
        handleErrors()
      
            axios.post(`https://otrok.invoacdmy.com/api/login/admin`,reqLoginData)
            .then((response)=> {
                console.log(response)
              localStorage.setItem("token",response.data.token)
              toast.success("Successfully Logged!")
              handleRedirect()
            })
            .catch((err)=>{
              toast.error(err.response.data.message)
            });
        }
  
        
    

    return (
        <>
            <section className={style['login-container']}>

                <div className='container'>
                    <div className='row'>
                  
                           
                            <div className={`${style.login} shadow`}>
                               
                                <div className={style.userName}> 
                                <h4>LOG IN</h4>
                                <p></p>
                                    <Form.Group className="mb-3" controlId="email">
                                        <div className={style['login-icon__container']}>
                                        <Form.Control name="email" type='email' autoComplete="off" className={`${style.inputLogin} `} placeholder="Email Address " onChange={onChangeHandler} value={formData.email} />
                                        <div className={style['login-icon__content']}>
                                          <BiUser />
                                        </div>
                                        <Form.Text className={`${style.msErr}`}>
                                            {formError.email}
                                        </Form.Text>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                      <div className={style['login-icon__container']}>
                                        <Form.Control name="password" type="password" autoComplete="off" className={style.inputLogin} placeholder="Password" onChange={onChangeHandler} value={formData.password} />
                                        <div className={style['login-icon__content']}>
                                          <RiLockPasswordLine />
                                        </div>
                                        <Form.Text className={`${style.msErr}`}>
                                            {formError.password}
                                        </Form.Text>
                                     </div>
                                    </Form.Group>
                                    <button className={style.log__btn} type='button' onClick={(e)=>{handleSubmitLogin(e)}}>login</button>
                                </div>
                       
                            </div>
                       
                          </div>
                        </div>

                <ToastContainer />
            </section>
      
       
        </>
    )
}
