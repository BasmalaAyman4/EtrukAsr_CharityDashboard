import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataType from "../../components/datatable/DataType"
const ListDonationType = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DataType />
            </div>
        </div>
    )
}

export default ListDonationType