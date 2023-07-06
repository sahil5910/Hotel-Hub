import { Link } from "react-router-dom";
import "./searchItem.css"

const SearchItem = ({ item }) => {
    const img = "https://cf.bstatic.com/xdata/images/hotel/square600/433812183.jpg?k=8cd24d2cf0a3e58e08241c94550c24fb42e9bf3610ff60a1aeb4cbe40c9052b5&o=";

    return (
        <div className="searchItem">
            <img src={item.photos.length > 0 ? item.photos[0] : img} alt="" className="siImg" />
            <div className="siDesc">
                <h1 className="siTitle">{item.name}</h1>
                <span className="siDistance">{item.distance}meter From center</span>
                <span className="siTaxiOp">Free airport taxi</span>
                <span className="siSubtitle">
                    {item.desc}
                </span>
                <span className="siFeatures">
                    Beds: 1 double or 2 singles
                </span>
                <span className="siCancelOp">Free cancellation</span>
                <span className="siCancelOpSubtitle">
                    You can cancel later, so lock in this great price today!
                </span>

            </div>
            <div className="siDetails">
                {item.rating &&
                    <div className="siRating">
                        <span>Excellent</span>
                        <button>{item.rating}</button>
                    </div>}
                <div className="siDetailTexts">
                    <span className="siPrice">₹ {item.cheapestPrice}</span>
                    <span className="siTaxOp">Includes taxes and fees</span>
                    <Link to={`/hotels/${item._id}`}>
                        <button className="siCheckButton">See availbility</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default SearchItem
