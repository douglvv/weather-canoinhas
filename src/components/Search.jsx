import { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';

function WeatherForm() {
    const [selectedDate, setSelectedDate] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const date = new Date(selectedDate).toISOString();

        console.log(date)
        
        const res = await axios.post('http://localhost:4000/searchWeatherData', {date: date})

        console.log(res);
    };

    return (
        <MDBContainer>
            <MDBRow className="justify-content-center mt-5">
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex m-2">
                            <MDBInput
                                type="datetime-local"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                            <MDBBtn type="submit" color="primary" className="">
                                Pesquisar
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>

      {
        weatherData && (
            <MDBRow className="justify-content-center mt-4">
                <MDBCol md="6">
                    {/* Display the fetched weather data here */}
                    <div>Date & Time: {weatherData.datetime}</div>
                    <div>Temperature (ºC): {weatherData.temp}</div>
                    <div>Weather: {weatherData.weather}</div>
                    {/* Add Edit and Delete buttons here */}
                </MDBCol>
            </MDBRow>
        )
    }
    </MDBContainer >
  );
}

export default WeatherForm;
