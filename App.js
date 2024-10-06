import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Image, ImageBackground} from 'react-native';
import axios from 'axios';
import styles from './styles';

const API_KEY = '2164510a6ea24dcca927ceaa88a8e3fe';

const backgroundImage = require('./assets/brolly.jpg');

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');
  const [localTime, setLocalTime] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
      calculateLocalTime(response.data.timezone);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Could not fetch weather. Please try a different city.');
    }
    setLoading(false);
  };

  const calculateLocalTime = (timezoneOffset) => {
    const currentUTC = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localDate = new Date(currentUTC + timezoneOffset * 1000);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    setLocalTime(localDate.toLocaleString('en-US', options));
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  const handleCitySubmit = () => {
    if (inputCity.trim() !== '') {
      setCity(inputCity);
      setInputCity('');
      Keyboard.dismiss();
    }
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.container}>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter city"
          value={inputCity}
          onChangeText={setInputCity}
        />

        <TouchableOpacity style={styles.button} onPress={handleCitySubmit}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading && <ActivityIndicator size="large" color="#dedee6" />}

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.localTime}>{localTime}</Text>
          <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
          <Image
            source={{ uri: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png` }}
            style={styles.weatherIcon}
          />
          <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.details}>Wind Speed: {weatherData.wind.speed} m/s</Text>

          {weatherData.weather[0].main === 'Rain' && (
            <Text style={styles.rainMessage}>Don't forget your Brolly!</Text>
          )}
        </View>
      )}
    </ImageBackground>
  );
}
