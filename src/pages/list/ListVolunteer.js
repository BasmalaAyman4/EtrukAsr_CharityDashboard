import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataDonation from '../../components/datatable/DataDonation'
import DataVolunteer from '../../components/datatable/DataVolunteer'


const ListVolunteer= () => {
  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
        <Navbar />
        <DataVolunteer />
    </div>
    </div>
  )
}

export default ListVolunteer