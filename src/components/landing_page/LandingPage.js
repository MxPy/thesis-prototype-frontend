import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";


//move it somewhere
function getCookie(key) {
    var b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : null;
  }
  
  function getFromLocalStorage(key) {
    try {
      const item = localStorage.getItem(key);
      if (!item) return null;
  
      const parsedItem = JSON.parse(item);
      if (parsedItem.expiration && new Date().getTime() > parsedItem.expiration) {
        localStorage.removeItem(key);
        console.log("kuuuuutas");
      
        console.log(new Date().getTime(), parsedItem.expiration);
        console.log(`Item '${key}' wygasł i został usunięty z localStorage.`);
        return null;
      }
  
      return parsedItem.value;
    } catch (error) {
      console.error("Błąd podczas odczytu z localStorage:", error);
      return null;
    }
  }

const LandingPage = () => {
    let navigate = useNavigate();
    useEffect(() => {
        if (getFromLocalStorage("token") === null){
            return navigate("/login");
        }
      }, [])

    return (
        <div>landingPage</div>
  )
}

export default LandingPage