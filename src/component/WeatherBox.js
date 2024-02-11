import React from 'react'

const WeatherBox = ({weather}) => {
  return (
    <div className="weather-box">
        <div className='name'>{weather?.name}</div>
        <div className='temp'>{weather?.main.temp}</div>
        <div className='description'>{weather?.weather[0].description}</div>
    </div>
  )
}

export default WeatherBox
