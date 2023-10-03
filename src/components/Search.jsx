import { useState } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdb-react-ui-kit';
import axios from 'axios';
import EditDeleteData from './EditDeleteData';

function WeatherForm() {
    const [selectedDate, setSelectedDate] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Cria um objeto da data e converte  para String ISO
        const date = new Date(selectedDate).toISOString();

        const res = await axios.post('http://localhost:4000/searchWeatherData', { date: date })

        console.log(res)

        // Converte para o horário local
        res.data.datetime = new Date(res.data.datetime).toLocaleTimeString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        setWeatherData(res.data)

    };


    // TODO: Mensagens de sucesso e reload no component ao excluir
    // TODO: Mensagem de erro se der erro na req
    // TODO: Edit Data

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
                        <EditDeleteData {...weatherData} />
                    </div>
                )
            }
        </MDBContainer >
    );
}

export default WeatherForm;
