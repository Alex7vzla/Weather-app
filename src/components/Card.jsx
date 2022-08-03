import React, {useState, useEffect} from 'react'
import axios from 'axios'
import 'boxicons'

const Card = ({lat, lon}) => {
  
  const [weather, setWeather] = useState();
  const [temperature, setTemperature] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    if(lon){
      const key ='adf54d7cf008f2b456fec0f72b33d1b3';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`

      axios.get(url)
        .then(res => {
          setWeather(res.data)
          const temp = {
          celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
          fahrenheit: `${Math.round((res.data.main.temp -273.15) * 9 / 5 + 32)} °F`
          }
          setTemperature(temp);
        })
        .catch(err => console.log(err))
    }
  }, [lat, lon])

  console.log(weather)

  const handleClick = () => setIsCelsius(!isCelsius);

  return (
    <div>
      <div className={weather?.weather[0].main === 'Clouds' ? 'bg-cloudy':
                      weather?.weather[0].main === 'Rain' ? 'bg-rainny':
                      weather?.weather[0].main === 'Sunny' ? 'bg-sunny':
                      'other-weather'
                      }>
        <div className='card'>
          <div>
          <h2 className='title'>Weather App<box-icon type='solid' name='sun' size='sm'></box-icon></h2>
          </div>
          <div  className='city-country'>
            <h3>{weather?.name}, {weather?.sys.country}</h3>
            <div className='container-icon'> 
            <box-icon type='solid' name='city'></box-icon>
            <box-icon type='solid' name='flag-alt'></box-icon>
            </div>
          </div>
          <div className='temp'>
            <h1>{isCelsius ? temperature?.celsius :temperature?.fahrenheit}</h1>
          </div>
          <div>
            <h4 className='weather'>{weather?.weather[0].description} </h4>
          </div>
          <div className='container-img'>
            <img src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="" />
          </div>
          <div className='grades'>
            <button className='btn' onClick={handleClick}><h4>{isCelsius ? 'Change to °F' : 'Change: °C' }</h4><box-icon name='transfer-alt' animation='flashing'></box-icon></button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default Card