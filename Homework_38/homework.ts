import {
  IApiResponse,
  IELEMENTConfig,
  IWeatherConfig,
  IWeatherState,
} from './types';

abstract class View {
  private wrapper: HTMLDivElement;
  private humidity: HTMLDivElement;
  private date: HTMLDivElement;
  private pressure: HTMLDivElement;
  private wind: HTMLDivElement;
  private tempeture: HTMLDivElement;
  private feelsLike: HTMLDivElement;
  private enviroment: HTMLDivElement;
  private icon: HTMLImageElement;
  refreshBtn: HTMLElement;
  abstract config: IWeatherConfig;
  abstract getWeather(data: IWeatherConfig): Promise<any>;

  constructor() {
    this.wrapper = this.createEl({
      attr: { class: 'weather' },
      type: 'div',
    });
    this.humidity = this.createEl({
      type: 'div',
      attr: { class: 'weather__humidity' },
    });
    this.date = this.createEl({
      type: 'div',
      attr: { class: 'weather__date' },
    });
    this.pressure = this.createEl({
      type: 'div',
      attr: { class: 'weather__pressure' },
    });
    this.wind = this.createEl({
      type: 'div',
      attr: { class: 'weather__wind' },
    });
    this.tempeture = this.createEl({
      type: 'div',
      attr: { class: 'weather__tempeture' },
    });
    this.feelsLike = this.createEl({
      type: 'div',
      attr: { class: 'weather__feelsLike' },
    });
    this.enviroment = this.createEl({
      type: 'div',
      attr: { class: 'weather__enviroment' },
    });
    this.icon = this.createEl({
      type: 'img',
      attr: { class: 'weather__icon' },
    });
    this.refreshBtn = this.createEl({
      type: 'i',
      attr: { class: 'weather__refresh bi bi-arrow-clockwise' },
    });

    this.initMarkup();
  }

  initMarkup() {
    this.wrapper.append(
      this.date,
      this.icon,
      this.humidity,
      this.pressure,
      this.wind,
      this.tempeture,
      this.feelsLike,
      this.enviroment,
      this.refreshBtn
    );
    this.refreshBtn.addEventListener('click', this.refreshEvent.bind(this));
    document.body.appendChild(this.wrapper);
  }
  refreshEvent(e: Event) {
    this.getWeather(this.config);
  }
  updateMarkUp(data: IWeatherState) {
    this.icon.setAttribute('src', String(data.icon));
    this.humidity.textContent = `Humidity: ${String(data.humidity)}%`;
    this.pressure.textContent = `Pressure: ${String(data.pressure)} hPa`;
    const currentDate = new Date();
    this.date.textContent = currentDate.toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    });
    this.tempeture.textContent = `${String(data.tempeture)} C`;
    this.wind.textContent = `Wind: ${String(data.pressure)} km/h`;
    this.feelsLike.textContent = `Feels Like: ${String(data.feels_like)} C`;
    this.enviroment.textContent = `${String(data.iconDesrtiption)}`;
  }
  createEl<U extends keyof HTMLElementTagNameMap>({
    type,
    attr,
    content,
  }: IELEMENTConfig<U>): HTMLElementTagNameMap[U] {
    const _el = document.createElement(type);
    if (content) _el.textContent = content;

    if (attr) {
      Object.entries(attr).forEach(([key, value]) => {
        _el.setAttribute(key, value);
      });
    }

    return _el;
  }
}
const defaultConf = {
  country: 'Ukraine',
  lang: 'en',
  units: 'metric',
  coords: null,
};

class Weather extends View {
  #API_KEY: string = '33e6b457abb9ed010bd7c6e30e06a810';
  #API_URL: string = 'https://api.openweathermap.org/data/2.5/weather?';
  #ICON_URL: string = 'https://openweathermap.org/img/wn/';
  config: IWeatherConfig;
  isLoading: boolean = false;
  constructor(config: IWeatherConfig) {
    super();
    this.config = { ...defaultConf, ...config };
    this.getWeather(this.config);
  }
  private makeIconUrl(iconstring: string): string {
    return `${this.#ICON_URL + iconstring}@2x.png`;
  }
  setLoader(bool: boolean) {
    this.isLoading = bool;
    this.refreshBtn.classList.toggle('active');
  }
  private makeUrl(config: IWeatherConfig): string {
    let url = this.#API_URL;
    const configKeys = Object.keys(config) as (keyof IWeatherConfig)[];
    configKeys.forEach(key => {
      if (!config[key]) return;
      const urlKey = key === 'country' ? 'q' : key;
      url += `${urlKey}=${config[key]}&`;
    });
    url += `appid=${this.#API_KEY}`;
    return url;
  }
  private normalizeState({ main, weather, wind }: IApiResponse): IWeatherState {
    return {
      tempeture: main.temp,
      feels_like: main.feels_like,
      pressure: main.pressure,
      icon: weather?.[0].icon ? this.makeIconUrl(weather[0].icon) : null,
      iconDesrtiption: weather[0].description,
      windSpeed: wind.speed,
      humidity: main.humidity,
    };
  }
  async getWeather(data2: IWeatherConfig): Promise<any> {
    try {
      this.setLoader(true);
      await wait(2000);
      const response = await fetch(this.makeUrl(data2));
      if (!response.ok) throw Error('Api error');
      const data: Awaited<IApiResponse> = await response.json();
      const normalizedState = this.normalizeState(data);
      this.updateMarkUp(normalizedState);
      console.log(normalizedState, data);
    } catch (e) {
    } finally {
      this.setLoader(false);
    }
  }
}
new Weather({
  units: 'metric',
  country: 'Kiev',
});

function wait(time: number = 5000): Promise<any> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve('');
    }, time)
  );
}
