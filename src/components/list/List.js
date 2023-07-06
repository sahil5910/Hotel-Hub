import './list.css'
import { useState } from 'react'
import Header from '../home/header/Header'
import Navbar from '../navbar/Navbar'
import { useLocation } from 'react-router-dom'
import { format, setDate } from 'date-fns';
import { DateRange } from 'react-date-range'
import SearchItem from '../searchedItem/SearchItem'
import useFetch from '../../hooks/useFetch'


const List = () => {
  // use to get whatever stored in the location usl;
  // as we stored the states of search in state of location url we will just use them
  const location = useLocation();
  const [destination, setdestination] = useState(location.state.destination);
  const [date, setdate] = useState(location.state.date);
  const [options, setoptions] = useState(location.state.options);
  const [openDate, setOpenDate] = useState(false); 

  const [min, setMin] = useState(undefined)
  const [max,setMax] = useState(undefined);
  

  const { data, loading, error, reFetch } = useFetch(`/hotels?city=${destination}&min=${min || 0}&max=${max || 9999999}`);

  const handleClick = ()=>{
    reFetch()
  }

  return (


    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => { setOpenDate(!openDate) }}>{`${format(date[0].startDate, "dd/MM/yyyy")} to ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
              {openDate && <DateRange
                onChange={(item) => setDate([item.selection])}
                minDate={new Date()}
                ranges={date}
              />}
            </div>
            <div className="lsItem">
              <label>Options</label>
              <div className="lsOptions">


                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min Price <small>per Night</small>
                  </span>
                  <input type="number" className='lsOptionInput'  onChange={e=>setMin(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max  Price <small>per Night</small>
                  </span>
                  <input type="number" className='lsOptionInput'onChange={e=>setMax(e.target.value)} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Adult
                  </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.adult} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Children
                  </span>
                  <input type="number" min={0} className='lsOptionInput' placeholder={options.children} />
                </div>
                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Rooms
                  </span>
                  <input type="number" min={1} className='lsOptionInput' placeholder={options.room} />
                </div>

              </div>

            </div>
            <button onClick={handleClick}>Search</button>
          </div>

          <div className="listResult">
            {
              loading ? "loading" :
                <>
                  {data.map(item => (

                    <SearchItem item={item} key={item._id} />

                  ))}

                </>

            }


          </div>
        </div>
      </div>
    </div>
  )
}

export default List
