export interface IWeatherIconMap {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface IWeatherParams {
  feels_like: number;
  humidity: number;
  pressure: number;
  temp: number;
}
export interface ICoords {
  long: number;
  lat: number;
}

export interface IApiResponse {
  coords: ICoords;
  main: IWeatherParams;
  name: string;
  weather: IWeatherIconMap[];
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
}
export interface IELEMENTConfig<T extends keyof HTMLElementTagNameMap> {
  type: T;
  attr?: { [s: string]: string };
  content?: string;
}

export interface IWeatherState {
  tempeture: number;
  feels_like: number;
  pressure: number;
  icon: string | null;
  iconDesrtiption: string;
  windSpeed: number;
  humidity: number;
}

export interface IWeatherConfig {
  units: string;
  lang?: string;
  coord?: ICoords;
  country: string;
}
