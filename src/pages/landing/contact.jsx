import React from 'react'
import './contact.scss'
import fb from '../../assets/icons/fb.png'
import x from '../../assets/icons/x.png'
import ig from '../../assets/icons/ig.png'

const Contact = () => {
    
  return (
    <div className="contactPageLanding">

        <div className="top__header">  
            <p> Reach out today - We are excited to hear about your ideas or needs. </p>
            <div className='subP'>Hey there! Our friendly team would love to hear from you and respond swiftly</div>
        </div>

        <div className="emailPoint"> Send us a mail to : <a href="mailto:lasricouncil@lagosstate.gov.ng"> lasricouncil@lagosstate.gov.ng </a> </div>

        <div className="socials">

            <div className="social"> <a href="https://web.facebook.com/p/Lasric-Lagos-100088673120709/?_rdc=1&_rdr#" target='_Blank' > <img src={fb} alt="" /> </a> </div>
            <div className="social"> <a href="https://www.instagram.com/lasriclagos/?hl=en" target='_Blank' > <img src={ig} alt="" /> </a> </div>
            <div className="social"> <a href="https://x.com/lasriclagos?lang=en" target='_Blank' > <img src={x} alt="" /> </a> </div>

        </div>

    </div>
  )
}

export default Contact
