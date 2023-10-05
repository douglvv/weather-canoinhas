import { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function WeatherForm() {
    const [selectedDate, setSelectedDate] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const navigate = useNavigate()

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Cria um objeto da data e converte  para String ISO
            const date = new Date(selectedDate).toISOString();

            const res = await axios.post('http://localhost:4000/searchWeatherData', { date: date })

            // Converte para o horário local
            res.data.datetime = new Date(res.data.datetime).toLocaleTimeString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            res.data.updatedAt = new Date(res.data.updatedAt).toLocaleTimeString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            setWeatherData(res.data)
        } catch (error) {
            console.log(error.message)
        }
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/deleteWeatherData/${weatherData._id}`)

            setWeatherData(null)
            alert(res.data)
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    const handleEdit = () => {
        navigate(`/editar/${weatherData._id}`)
    }

    return (
        <MDBContainer>
            <h3 className='text-center mt-5'>Pesquisar Registro</h3>
            <MDBRow className="justify-content-center mt-3">
                <MDBCol md="6">
                    <form onSubmit={handleSubmit}>
                        <div className="d-flex m-2">
                            <MDBInput
                                required
                                type="datetime-local"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                            <MDBBtn type="submit" color="primary">
                                Pesquisar
                            </MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>

            {
                weatherData && (
                    <div className='mt-5 d-flex justify-content-center'>
                        <MDBTable align='middle'>
                            <MDBTableHead>
                                <tr>
                                    <th scope='col'>Cidade</th>
                                    <th scope='col'>Data</th>
                                    <th scope='col'>Data update</th>
                                    <th scope='col'>Icon</th>
                                    <th scope='col'>Desc.</th>
                                    <th scope='col'>Temp.</th>
                                    <th scope='col'>Sens.</th>
                                    <th scope='col'>Umid</th>
                                    <th scope='col'>Actions</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                <tr>
                                    <td>
                                        <p className='fw-normal mb-1'>{weatherData.cidade}</p>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>
                                            {weatherData.datetime}
                                        </p>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>
                                            {weatherData.updatedAt}
                                        </p>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>
                                            {weatherData.weather_icon}
                                        </p>
                                    </td>

                                    <td>
                                        <p>{weatherData.weather}</p>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>{weatherData.temp} ºC</p>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>{weatherData.sens_term} ºC</p>
                                    </td>

                                    <td>
                                        <p className='fw-normal mb-1'>{weatherData.umid} %</p>
                                    </td>

                                    <td>
                                        <MDBBtn color='primary' onClick={handleEdit} rounded size='sm'>
                                            Edit
                                        </MDBBtn>
                                        <MDBBtn color='danger' onClick={handleDelete} rounded size='sm'>
                                            Delete
                                        </MDBBtn>
                                    </td>

                                </tr>
                            </MDBTableBody>
                        </MDBTable>
                    </div>
                )
            }
        </MDBContainer >
    );
}

export default WeatherForm;
