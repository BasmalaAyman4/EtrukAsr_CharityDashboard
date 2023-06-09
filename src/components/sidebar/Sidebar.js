import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import BsCalendarEvent from "@mui/icons-material/CalendarTodayOutlined"
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AiFillBankIcon from '@mui/icons-material/Home'
import { AiOutlineGold } from 'react-icons/ai'
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import logo from './../../../src/assets/images/whiteLogo.png'
import styles from "./Sidebar.module.css"
import GavelIcon from '@mui/icons-material/Gavel';
import axios from "axios";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const Logout = async () => {
    await delay(1000);
    localStorage.setItem('tokenC', '')
    window.location.reload();

  }

  

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} alt='' className={styles["side-bar__logo"]} />
          {/* <span className="logo">Admin</span> */}
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/cases" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Cases</span>
            </li>
          </Link>
          <Link to="/categories" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Category </span>
            </li>
          </Link>
          <Link to="/donaionTypes" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Donations Types</span>
            </li>
          </Link>
          <Link to="/donation" style={{ textDecoration: "none" }}>
            <li>
              <LocalShippingIcon className="icon" />
              <span>Donations</span>
            </li>
          </Link>
       
          <Link to="/event" style={{ textDecoration: "none" }}>
            <li>
              <BsCalendarEvent className="icon" />
              <span>Events</span>
            </li>
          </Link>
         
      
          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={() => { Logout() }}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>

      </div>
    </div>
  );
};

export default Sidebar;
