import {
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditData() {
    const { id } = useParams();
    const [weatherData, setWeatherData] = useState(null)


    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:4000/getWeatherById/${id}`)

            // Converte para o horário local
            res.data.datetime = new Date(res.data.datetime).toLocaleTimeString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            setWeatherData(res.data)
        }

        fetchData()
    }, [])

    return (
        <MDBContainer className='mt-5'>
            {weatherData ? (
                <>
                    <h3 className='text-center mt-5'>Editar Registro: {id}</h3>
                    <form className='mt-3'>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='cidade' label='Cidade' value={weatherData.cidade} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput className='mb-4' type='datetime' id='data' label='Data' value={weatherData.datetime} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='desc' label='Desc' value={weatherData.weather} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='icon' label='Icon' value={weatherData.weather_icon} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='temp' label='Temp' value={weatherData.temp} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='sens' label='Sens.' value={weatherData.sens_term} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='umid' label='Umid.' value={weatherData.umid} />
                            </MDBCol>
                        </MDBRow>

                        <MDBBtn type='submit' className='mb-4' block>
                            Editar
                        </MDBBtn>
                    </form>
                </>
            ) : (
                <p className='text-center mt-5'>Nenhum dado encontrado para edição.</p>
            )}
        </MDBContainer>
    );

}