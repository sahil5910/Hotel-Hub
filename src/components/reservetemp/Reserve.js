import axios from "axios"
import { SearchContext } from "../../context/SearchContext"
import useFetch from "../../hooks/useFetch"
import "./reserve.css"
import { useContext, useState } from "react"
import {  useNavigate } from "react-router-dom"

const Reserve = (props) => {
    
    const navigate = useNavigate();

    const [selectedRooms, setSelectedRooms] = useState([])
    const { data, loading, error } = useFetch(`/hotels/room/${props.hotelId}`)
    const { date } = useContext(SearchContext)

    const getDateInRange = (start, end) => {
        const date = new Date(start.getTime());

        let list = []
        while (date <= end) {
            list.push((new Date(date)).getTime());
            date.setDate(date.getDate() + 1);
        }
        return list;
    }

    const allDates = getDateInRange(date[0].startDate, date[0].endDate);

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some((date) =>
            allDates.includes(new Date(date).getTime())
        )
        return !isFound

    }

    const handleSelect = (e) => {

        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(
            checked ?
                [...selectedRooms, value] :
                selectedRooms.filter((item) => item !== value)
        )

    }

    // <h1>Hellooo</h1>
    const handleClick = async (e) => {
        try {
            await Promise.all(selectedRooms.map(async (roomId) =>  {
                console.log("room ",roomId);
                const res =  await axios.put(`/rooms/availbility/${roomId}`, { dates: allDates })
                console.log(res);
                return res.data;
            }))
            props.setOpen(false);
            navigate("/")

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="reserve">
            <div className="rContainer">
                <i className="fa-solid fa-circle-xmark rclose" onClick={() => props.setOpen(false)}></i>
                <span>Select Your Room:</span>
                {loading ? "loadin " : data.map(item => (
                    <div className="rItem" key={item._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item.title}</div>
                            <div className="rDesc">{item.desc}</div>
                            <div className="rMax">Max people: <b>{item.maxPeople}</b></div>
                            <div className="rPrice">Price : <b>{item.price}</b>   </div>
                        </div>
                        <div className="rSelectRooms">

                            {item.roomNumbers.map(roomNumber => (
                                <div className="room" key={roomNumber.number}>

                                    <label>{roomNumber.number}</label>
                                    <input
                                        disabled={!(isAvailable(roomNumber))}
                                        type="checkbox"
                                        value={roomNumber._id}
                                        onChange={handleSelect}
                                    />

                                </div>
                            ))}
                        </div>



                    </div>

                ))}
                <button onClick={handleClick} className="rButton">Reserve Now!</button>



            </div>


        </div>
    )
}

export default Reserve

