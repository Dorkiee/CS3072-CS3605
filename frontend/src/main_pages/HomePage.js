import React from 'react'
import {Image } from 'react-bootstrap';
import "./CSS/HomePage.css"
import bannerImage3 from './MainMenuPictures/banner2.png'

import Footer from './footer.js';
function HomePage() {
  return (
    <div>
      <Image src={bannerImage3} fluid style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}/>
      <Footer/>
    </div>
  )
}

export default HomePage

