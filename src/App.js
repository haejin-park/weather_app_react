import { useEffect, useState } from 'react';
import './App.css';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton'
import { ClipLoader } from 'react-spinners';
/*
1. 앱이 실행되자마자 현재 위치 기반의 날씨가 보인다.
2. 날씨 정보에는 도시, 섭씨, 화씨 날씨상태
3. 5개의 버튼이 있다.(1개는 현재위치, 4개는 다른 도시)
4. 도시 버튼을 클릭할 때 마다 도시별 날씨가 나온다.
5. 현재 위치 버튼을 누르면 다시 현재 위치 기반의 날씨가 나온다. 
6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
*/ 

function App() {

  let [weather, setWeather] = useState(null);
  const cities = ['Switzerland', 'Paris', 'New York', 'Saipan'];
  let [city, setCity] = useState('');
  let [loading, setLoading] = useState(false);
  let [apiError, setApiError] = useState("");
  const API_KEY = process.env.REACT_APP_API_KEY;

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude; 
      let lon = position.coords.longitude;  
      getWeatherByCurrentLocation(lat,lon);
    }); 
  };
  const getWeatherByCurrentLocation = async(lat,lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  };

  const  getWeatherByCity = async() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    try {
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setApiError(err.message);
      setLoading(false);
    }
  }
  

  useEffect(() => {
    if(city === "") {
      getCurrentLocation();
    } else { 
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    if(city === 'current') {
      setCity("");
    } else {
      setCity(city);
    }
  }

  return (
    <div> 
        {loading? (
          <div className="container">
            <ClipLoader color="#f88cb6" loading={loading} size={150}/>
          </div>
        ) : !apiError? (
          <div className="container">
            <WeatherBox weather={weather}/>
            <WeatherButton cities={cities} selectedCity={city} handleCityChange={handleCityChange}/>
          </div>
          ) : (
            apiError
          )}
      </div>
  );
}

export default App;
