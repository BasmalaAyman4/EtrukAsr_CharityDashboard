import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import DataType from "../../components/datatable/DataType"
import DataEvent from "../../components/datatable/DataEvent"
const ListEvent = () => {
    return (
        <div className="list">
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <DataEvent />
            </div>
        </div>
    )
}

export default ListEvent