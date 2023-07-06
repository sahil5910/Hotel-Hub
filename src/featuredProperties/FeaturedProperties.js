import useFetch from "../hooks/useFetch";
import "./featuredProperties.css"
const FeaturedProperties = () => {

    const { data, loading, error } = useFetch("/hotels?featured=true&limit=3");

    const images = [
        "https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=35b70a7e8a17a71896996cd55d84f742cd15724c3aebaed0d9b5ba19c53c430b&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/87428762.webp?k=de5db8fe94cbfe08d3bf16d3c86def035fd73b43ee497cffe27b03363764e0e2&o=",
        "https://cf.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o="
    ]

    console.log(data);
    return (
        <div className="fp">
            {loading ? "Loading" :
                <>
                    {data.map((item,i) => (

                        <div className="fpItem" key={item._id}>
                            <img src={item.photos.length >0 ?item.photos[0]:images[i]} alt="" className="fpImg" />
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ₹{item.cheapestPrice}</span>
                            {item.rating && <div className="fpRating">
                                <button>
                                {item.rating}
                                </button>
                                <span>Excellent</span>

                            </div>}
                        </div>
                    ))
                    }

                </>
            }
        </div>
    )
}

export default FeaturedProperties
