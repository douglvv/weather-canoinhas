import { useEffect, useState } from "react";
import axios from "axios";
import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";

export default function Weather() {
    const [weatherData, setWeatherData] = useState({});

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:4000/getCurrentWeatherData');
            const data = response.data;

            // Converte para o horário local
            data.datetime = new Date(data.datetime).toLocaleTimeString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            setWeatherData(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <MDBContainer className="h-100">
                <MDBRow className="justify-content-center align-items-center m-3">
                    <MDBCol md="8" lg="6" xl="4">
                        <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
                            <MDBCardBody className="p-4">
                                <div className="d-flex justify-content-center align-items-center text-center">
                                    <ul className="list-unstyled mb-0">
                                        <li>
                                            <MDBTypography tag="h2" className="flex-grow-1">
                                                {weatherData.cidade} - SC
                                            </MDBTypography>
                                        </li>
                                        <li>
                                            <MDBTypography tag="h6" className="flex-grow-1">
                                                {weatherData.datetime}
                                            </MDBTypography>
                                        </li>
                                    </ul>
                                </div>

                                <div className="d-flex flex-column text-center mt-5 mb-4">
                                    <MDBTypography
                                        tag="h4"
                                        className="display-4 mb-0 font-weight-bold"
                                        style={{ color: "#1C2331" }}
                                    >
                                        {weatherData.temp} ºC
                                    </MDBTypography>
                                    <div className="d-flex flex-row align-items-center justify-content-center text-center">
                                        <h4>
                                            {weatherData.weather}
                                        </h4>
                                        <img
                                            src={`http://openweathermap.org/img/wn/${weatherData.weather_icon}.png`}
                                            width="50px"
                                            alt="Weather Icon"
                                            className="custom-drop-shadow"
                                        />
                                    </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-center mb-5">
                                    <ul className="list-unstyled mb-0" style={{ fontSize: '1rem' }}>
                                        <li>
                                            Sens.: {weatherData.sens_term} ºC
                                        </li>
                                        <li>
                                            Umid.: {weatherData.umid}%
                                        </li>
                                    </ul>
                                </div>
                            </MDBCardBody>
                            <MDBCardFooter className="d-flex align-items-center justify-content-center  mb-0">
                                <h6 style={{ color: "#1C2331" }}>
                                    <small>
                                        Data from: <a href="https://openweathermap.org/" target="blank">Open Weather Map API</a>
                                    </small>
                                </h6>
                            </MDBCardFooter>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}
