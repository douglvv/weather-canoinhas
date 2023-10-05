import {
    MDBInput,
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditData() {
    const { id } = useParams();
    const [weatherData, setWeatherData] = useState(null);
    const [cidade, setCidade] = useState('');
    const [datetime, setDatetime] = useState('');
    const [weather, setWeather] = useState('');
    const [icon, setIcon] = useState('');
    const [temp, setTemp] = useState(0.0);
    const [sensTerm, setSensTerm] = useState(0.0);
    const [umid, setUmid] = useState(0.0);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`http://localhost:4000/getWeatherById/${id}`);

            res.data.datetime = new Date(res.data.datetime).toLocaleTimeString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            setWeatherData(res.data);
            setCidade(res.data.cidade);
            setDatetime(res.data.datetime);
            setWeather(res.data.weather);
            setIcon(res.data.weather_icon);
            setTemp(res.data.temp);
            setSensTerm(res.data.sens_term);
            setUmid(res.data.umid);
        }
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataISO = new Date(datetime).toISOString();
            
            const updatedWeatherData = {
                cidade,
                datetime: dataISO,
                weather,
                weather_icon: icon,
                temp,
                sens_term: sensTerm,
                umid,
            };

            const res = await axios.put(`http://localhost:4000/editWeatherData/${id}`, updatedWeatherData);

            if (res.status === 200) {
                alert("Dados editados com sucesso!");
                navigate('/pesquisar');
            } else {
                alert("Erro ao editar dados:", res.data);
                navigate(`/editar/${id}`)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <MDBContainer className='mt-5'>
            {weatherData ? (
                <>
                    <h3 className='text-center mt-5'>Editar Registro: {id}</h3>
                    <form className='mt-3'>
                        <MDBRow>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='cidade' name='cidade' label='Cidade' value={cidade} onChange={(e) => setCidade(e.target.value)} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='datetime' name='datetime' label='Data' value={datetime} onChange={(e) => setDatetime(e.target.value)} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol>
                                <MDBInput className='mb-4' type='text' id='weather' name='weather' label='Desc' value={weather} onChange={(e) => setWeather(e.target.value)} />
                            </MDBCol>
                            <MDBCol>
                            <MDBInput className='mb-4' type='text' id='icon' name='icon' label='Icon' value={icon} onChange={(e) => setIcon(e.target.value)} />
                            </MDBCol>
                        </MDBRow>

                        <MDBRow>
                            <MDBCol>
                                <MDBInput className='mb-4' type='number' id='temp' name='temp' label='Temp' value={temp} step='0.1' onChange={(e) => setTemp(parseFloat(e.target.value))} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput className='mb-4' type='number' id='sens_term' name='sens_term' label='Sens.' value={sensTerm} step='0.1' onChange={(e) => setSensTerm(parseFloat(e.target.value))} />
                            </MDBCol>
                            <MDBCol>
                                <MDBInput className='mb-4' type='number' id='umid' name='umid' label='Umid.' value={umid} step='0.1' onChange={(e) => setUmid(parseFloat(e.target.value))} />
                            </MDBCol>
                        </MDBRow>

                        <MDBBtn onClick={handleSubmit} className='mb-4' block>
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
