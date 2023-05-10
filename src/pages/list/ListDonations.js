import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataDonation from '../../components/datatable/DataDonation'


const ListDonations = () => {
  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
        <Navbar />
        <DataDonation />
    </div>
    </div>
  )
}

export default ListDonations