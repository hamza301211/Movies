import React from 'react'
import "./Footer.css"

const Footer = () => {
    return (
        <footer id='footer'>
            <div className='leftFooter'>
                <h4>PFTP FINAL PROJECT</h4>
                <p>Using MERN stack development</p>
                <img src='mernlogo.png' alt='tech' />
            </div>


            <div className='midFooter'>
                <h1>MOVIES WEBSITE</h1>
                <p>!!!!!!!!!!DEVELOPER!!!!!!!!!!</p>

                <p>Copyrights 2022 &copy; HamzaNadeem</p>
            </div>



            <div className='rightFooter'>
                <h4>Follow ME</h4>
                <a href='https://www.instagram.com/hamzanadeem_30/'>INSTAGRAM</a>
                <a href='https://www.facebook.com/hamza.nadeem.14289/'>FACEBOOK</a>
            </div>





        </footer>
    )
}

export default Footer