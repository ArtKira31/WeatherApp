type WeatherData = {
    base: string,
    clouds: { all: number },
    cod: number,
    coord: { lon: number, lat: number },
    dt: number,
    id: number,
    name: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        grnd_level: number,
        humidity: number,
        sea_level: number,
    },
    sys: { type: number, id: number, country: string, sunrise: number, sunset: number }
    timezone: number,
    visibility: number,
    weather: [{
        description: string,
        icon: string,
        id: number,
        main: string
    }],
    wind: { speed: number, deg: number, gust: number }
}
export default WeatherData;

