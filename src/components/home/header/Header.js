import './header.css'
import { useState } from 'react';
import { addDays } from 'date-fns';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { SearchContext } from '../../../context/SearchContext';
import { AuthContext } from '../../../context/AuthContext';
const Header = (props) => {
    const navigate = useNavigate();
    const [destination, setdestination] = useState("")
    const [openDate, setOpenDate] = useState(false);
    const [openOption, setopenOption] = useState(false);

    const {dispatch} = useContext(SearchContext)


    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })
    const [date, setdate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const handleOption = (name, operataion) => {
        // taking previous state and updating it 
        setOptions(prev => {
            return { ...prev, [name]: operataion === 'i' ? options[name] + 1 : options[name] - 1 }
        })
    }
    const handleSearch = ()=>{
        dispatch({type:"NEW_SEARCH" , payload:{destination,date,options}})
        navigate('/hotels',{state:{destination,date,options }} )
    }


    const {  user } = useContext(AuthContext);


    

    return (
        <div>
            <div className="header">
                <div className={props==="list"? "headerContainer listMode":"headerContainer"}>
                    <div className="headerList">
                        <div className="headerListItem active">
                            <i className="fa-solid fa-bed"></i>
                            <span>Stays</span>
                        </div>
                        <div className="headerListItem">
                            <i className="fa-solid fa-plane"></i>
                            <span>Flights</span>
                        </div>
                        <div className="headerListItem">
                            <i className="fa-solid fa-car"></i>
                            <span>Car Rentals</span>
                        </div>
                        <div className="headerListItem">
                            <i className="fa-solid fa-bed"></i>
                            <span>Attractions</span>
                        </div>
                        <div className="headerListItem">
                            <i className="fa-solid fa-taxi "></i>
                            <span>Airport Taxis</span>
                        </div>
                    </div>
                    {props.type !== "list" && <><h1 className='headerTitle'>
                        A lifetime of discounts? It's Genius.
                    </h1>
                        <p className='headerDesc'>
                            Get rewarded for your travels - unlock instant savings of 10% or more with a free Hotelhub account
                        </p>
                        {   !user && 
                            <button className='headerBtn'>Sign in / Register</button>
                        }
                        <div className="headerSearch">
                            <div className="headerSearchItem">
                                <i className="fa-solid fa-bed headerIcon" ></i>
                                <input type="text" placeholder='Where are you going ?' className='headerSearchInput'  onChange={e=>setdestination(e.target.value.toLowerCase())}/>
                            </div>
                            <div className="headerSearchItem">
                                <i className="fa-solid fa-calendar headerIcon"></i>
                                <span onClick={() => { setOpenDate(!openDate) }} className='headerSearchText'>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
                                {openDate && <DateRange
                                    editableDateInputs={true}
                                    onChange={item => setdate([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={date}
                                    className='date'
                                    minDate={new Date()}
                                />}
                            </div>
                            <div className="headerSearchItem">
                                <i className="fa-solid fa-person headerIcon"></i>
                                <span onClick={() => { setopenOption(!openOption) }} className='headerSearchText'>{`${options.adult} Adult . ${options.children} Children . ${options.room} Room`}</span>
                                {openOption && <div className="options">
                                    <div className="optionItem">
                                        <span className="optionText">Adult</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.adult <= 1} onClick={() => handleOption("adult", "d")}>-</button>
                                            <span className="optionCounterNumber">{`${options.adult}`}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Children</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.children <= 0} onClick={() => handleOption("children", "d")}>-</button>
                                            <span className="optionCounterNumber">{`${options.children}`}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                                        </div>
                                    </div>
                                    <div className="optionItem">
                                        <span className="optionText">Room</span>
                                        <div className="optionCounter">
                                            <button className="optionCounterButton" disabled={options.room <= 1} onClick={() => handleOption("room", "d")}>-</button>
                                            <span className="optionCounterNumber">{`${options.room}`}</span>
                                            <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                            <div className="headerSearchItem">
                                <button className='headerBtn' onClick={handleSearch}>Search</button>
                            </div>
                        </div></>}
                </div>
            </div>
        </div >
    )
}

export default Header
