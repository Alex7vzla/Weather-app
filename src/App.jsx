import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card';

function App() {

  const [coords, setCoords] = useState();

  useEffect(() => {
    
    const success = pos => {
      const latLon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      };
      setCoords(latLon)
    }
 
    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
   
    <div className="App">
            <Card lon={coords?.lon} lat={coords?.lat}/>
    </div>
  )
}

export default App
