import React  from 'react'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const WeatherButton = ({cities, selectedCity, handleCityChange}) => {
    return (
        <div className="button-group">
            <div>
                <Button variant={`${selectedCity === "" ? "info" : "outline-info"}`} className='location-btn' onClick={() => handleCityChange("current")}>Current Location</Button>
                {cities.map((city,index) => (
                    <Button 
                        variant={`${selectedCity === city ? "info" : "outline-info" }`}
                        className='city-btn' 
                        key={index} 
                        onClick={() => handleCityChange(city)}
                    >
                        {city}    
                    </Button>
                ))}
            </div>
        </div>
    )
}

export default WeatherButton
