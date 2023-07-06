

import FeaturedProperties from '../../featuredProperties/FeaturedProperties'
import Featured from '../featured/Featured'
import Footer1 from '../footer/Footer1'

import MailList from '../mailList/MailList'
import Navbar from '../navbar/Navbar'
import PropertyList from '../propertyList/PropertyList'
import Header from './header/Header'
import './home.css'


const Home = () => {
  return (
    <div>
      <Navbar/>
        <Header />
        <div className="homeContainer">
           <Featured/>
           <h1 className='homeTitles'>Browse by property type </h1>
           <PropertyList/>
           <h1 className='homeTitles'>Homes Guests love </h1>
           <FeaturedProperties/>
           <MailList/>
           <Footer1/>
        </div>
    </div>
  )
}

export default Home
