import axios from 'axios';
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function EditDeleteData(weatherData) {
    const navigate = useNavigate()

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:4000/deleteWeatherData/${weatherData._id}`)

            navigate('/pesquisar');
            alert(res.data)            
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }

    return (
        <>
            <MDBTable align='middle'>
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Cidade</th>
                        <th scope='col'>Data</th>
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
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherData.weather_icon}.png`}
                                width="45px"
                                alt="Weather Icon"
                                className="shadow rounded-circle"
                            />
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
                            <MDBBtn color='primary' rounded size='sm'>
                                Edit
                            </MDBBtn>
                            <MDBBtn color='danger' onClick={handleDelete} rounded size='sm'>
                                Delete
                            </MDBBtn>
                        </td>

                    </tr>
                </MDBTableBody>
            </MDBTable>
        </>
    );
}