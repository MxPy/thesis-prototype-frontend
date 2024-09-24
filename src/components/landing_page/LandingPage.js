import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


//move it somewhere
function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : null;
  }

const LandingPage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (getCookie("token") === null){
            return navigate("/login");
        }
      }, [])

    return (
        <div>landingPage</div>
  )
}

export default LandingPage