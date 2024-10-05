import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, ImageBackground} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const API_KEY = '2164510a6ea24dcca927ceaa88a8e3fe';

const backgroundImage = require('./assets/brolly.jpg');

export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState('London');
  const [inputCity, setInputCity] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Could not fetch weather. Please try a different city.');
    }
    setLoading(false);
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

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <Icon name="umbrella" size={150} color="#fff" />

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityName}>{weatherData.name}</Text>
          <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
          <Text style={styles.description}>{weatherData.weather[0].description}</Text>
          <Text style={styles.details}>Humidity: {weatherData.main.humidity}%</Text>
          <Text style={styles.details}>Wind Speed: {weatherData.wind.speed} m/s</Text>

          {weatherData.weather[0].main === 'Rain' && (
            <Text style={styles.rainMessage}>It's raining, grab your brolly!</Text>
          )}
        </View>
      )}
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#435d91',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'left',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
    padding: 0,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginRight: 10,
    width: '80%',
    backgroundColor: '#fff',
    opacity: 0.7,
  },
  button: {
    height: 40,
    backgroundColor: '#fff',
    paddingVertical: 0,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'grey',
    fontSize: 14,
  },
  weatherContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  cityName: {
    fontSize: 50,
    color: '#fff',
  },
  temp: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    padding: 30,
  },
  description: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#fff',
  },
  details: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
  },
  rainMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
});
