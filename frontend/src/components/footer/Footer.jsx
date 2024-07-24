import React from 'react'
import './footer.css'
import {AiFillFacebook, AiFillInstagram} from 'react-icons/ai'
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 Your Learners Platform. All rights reserved.
          <br />Made with 💖 <a href="">Ishit Singh</a>
        </p>
        <div className="social-links">
          <a href=""><AiFillFacebook/></a>
          <a href=""><FaSquareXTwitter /></a>
          <a href=""><AiFillInstagram/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer