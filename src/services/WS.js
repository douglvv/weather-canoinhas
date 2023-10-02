import Api from "./Api";

const WS = {

    // Connecta no rmq
    getCurrentWeatherData: async () => {
        const res = await Api.post('/getCurrentWeatherData')
        console.log(res)
        return res.data;
    },

}


export default WS;