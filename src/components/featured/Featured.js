import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import './featured.css'


const Featured =  () => {



    const { data, loading, error } =  useFetch("/hotels/countByCity?cities=delhi,mumbai,jaipur");


    return (
        <div className="featured">
            {
                loading? "Loading please wait" :
                
                <><div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/684765.jpg?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o=" className='featuredImg' alt="" />
                <div className="featuredTitles">
                    <h1>
                        Delhi
                    </h1>
                    <h2>
                        {data[0]} Properties
                    </h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/971346.jpg?k=40eeb583a755f2835f4dcb6900cdeba2a46dc9d50e64f2aa04206f5f6fce5671&o=" className='featuredImg' alt="" />
                <div className="featuredTitles">
                    <h1>
                        Mumbai
                    </h1>
                    <h2>
                    {data[1]} Properties

                    </h2>
                </div>
            </div>
            <div className="featuredItem">
                <img src="https://cf.bstatic.com/xdata/images/city/600x600/684657.jpg?k=66dc5035b43e9bb86b756e381e4fec2558064af4a63a8af17836725a854c03ee&o=" className='featuredImg' alt="" />
                <div className="featuredTitles">
                    <h1>
                        Jaipur
                    </h1>
                    <h2>
                    {data[2]} Properties


                    </h2>
                </div>
            </div></>}
        </div>
    )
}

export default Featured
