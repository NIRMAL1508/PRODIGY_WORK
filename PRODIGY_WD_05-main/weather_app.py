import streamlit as st
import requests

def get_weather(api_key, city, units='metric'):
    base_url = 'http://api.openweathermap.org/data/2.5/weather'
    params = {'q': city, 'units': units, 'appid': api_key}
    
    response = requests.get(base_url, params=params)
    data = response.json()
    
    if 'main' not in data or 'weather' not in data:
        return None  
    
    return data

def main():
    st.title("Weather App")

    city = st.text_input("Enter city name:", "")
    api_key = '16c1109f09a41022a117d450993b3479'

    if st.button("Get Weather"):
        weather_data = get_weather(api_key, city)

        if weather_data is None:
            st.error("Error fetching weather data. Please try again.")
        elif weather_data.get('cod') == '404':
            st.error("City not found. Please check the city name.")
        else:
            st.success(f"Weather information for {city}:")
            st.write(f"Temperature: {weather_data['main']['temp']} °C")
            st.write(f"Condition: {weather_data['weather'][0]['description']}")
            st.write(f"Humidity: {weather_data['main']['humidity']}%")
            st.write(f"Wind Speed: {weather_data['wind']['speed']} m/s")


if __name__ == "__main__":
    main()
