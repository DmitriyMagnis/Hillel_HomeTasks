import {
  FUNC,
  IApiError,
  IApiResponse,
  ICoords,
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
  private place: HTMLDivElement;
  private icon: HTMLImageElement;
  private search: HTMLInputElement;
  private errorContainer: HTMLUListElement;
  refreshBtn: HTMLElement;

  abstract config: IWeatherConfig;
  abstract getWeather(data: IWeatherConfig): Promise<any>;

  constructor() {
    this.wrapper = View.createEl({
      attr: { class: 'weather' },
      type: 'div',
    });
    this.humidity = View.createEl({
      type: 'div',
      attr: { class: 'weather__humidity' },
    });
    this.date = View.createEl({
      type: 'div',
      attr: { class: 'weather__date' },
    });
    this.pressure = View.createEl({
      type: 'div',
      attr: { class: 'weather__pressure' },
    });
    this.wind = View.createEl({
      type: 'div',
      attr: { class: 'weather__wind' },
    });
    this.tempeture = View.createEl({
      type: 'div',
      attr: { class: 'weather__tempeture' },
    });
    this.feelsLike = View.createEl({
      type: 'div',
      attr: { class: 'weather__feelsLike' },
    });
    this.enviroment = View.createEl({
      type: 'div',
      attr: { class: 'weather__enviroment' },
    });
    this.place = View.createEl({
      type: 'div',
      attr: { class: 'weather__place' },
    });
    this.icon = View.createEl({
      type: 'img',
      attr: { class: 'weather__icon' },
    });
    this.refreshBtn = View.createEl({
      type: 'i',
      attr: { class: 'weather__refresh bi bi-arrow-clockwise' },
    });
    this.search = View.createEl({
      type: 'input',
      attr: { class: 'search', placeholder: 'Search' },
    });
    this.errorContainer = View.createEl({
      type: 'ul',
      attr: { class: 'error' },
    });
    this.initMarkup();
  }

  initMarkup() {
    this.wrapper.append(
      this.date,
      this.icon,
      this.place,
      this.humidity,
      this.pressure,
      this.wind,
      this.tempeture,
      this.feelsLike,
      this.enviroment,
      this.refreshBtn
    );
    this.search.addEventListener('input', trottle(this.onSearchEvent, 500));
    this.refreshBtn.addEventListener('click', this.refreshEvent);
    document.body.append(this.search, this.wrapper);
    document.body.appendChild(this.errorContainer);
  }
  onSearchEvent = (e: InputEvent) => {
    const target = e.target as HTMLInputElement;
    this.getWeather({ ...this.config, q: target.value });
  };
  refreshEvent = () => {
    this.getWeather(this.config);
  };
  showErrorNotification = (message: string, errorTimeout: number = 6000) => {
    let timeId = setTimeout(() => {
      const item = Array.from(this.errorContainer.children).find(
        item => item.getAttribute('dataId') === String(timeId)
      );
      if (item) item.remove();
    }, errorTimeout);
    const errorItem = View.createEl({
      type: 'li',
      attr: { class: 'error__item', dataId: String(timeId) },
      content: message,
    });
    this.errorContainer.appendChild(errorItem);
  };
  updateMarkUp(data: IWeatherState) {
    this.icon.setAttribute('src', String(data.icon));
    this.humidity.textContent = `Humidity: ${String(data.humidity)}%`;
    this.pressure.textContent = `Pressure: ${String(data.pressure)} hPa`;
    this.date.textContent = new Date().toLocaleString('en-US', {
      hour: 'numeric',
      hour12: true,
      minute: 'numeric',
    });
    this.tempeture.textContent = `${String(data.tempeture)} C`;
    this.place.textContent = `${String(data.name)}`;
    this.wind.textContent = `Wind: ${String(data.pressure)} km/h`;
    this.feelsLike.textContent = `Feels Like: ${String(data.feels_like)} C`;
    this.enviroment.textContent = `${String(data.iconDesrtiption)}`;
  }
  static createEl<U extends keyof HTMLElementTagNameMap>({
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
const defaultConf: IWeatherConfig = {
  lang: 'en',
  units: 'metric',
  coord: null,
};

class Weather extends View {
  #API_KEY: string = '33e6b457abb9ed010bd7c6e30e06a810';
  #API_URL: string = 'https://api.openweathermap.org/data/2.5/weather?';
  #ICON_URL: string = 'https://openweathermap.org/img/wn/';
  public config: IWeatherConfig;
  private abortController: AbortController | null;
  private _isLoading: boolean = false;
  constructor(config?: IWeatherConfig) {
    super();
    this.config = { ...defaultConf, ...config };
    this.init();
  }
  private async init(): Promise<void> {
    try {
      const data = await this.getGeolocation();
      this.onSuccess(data);
    } catch (e) {
      this.onError(e);
    }
  }
  set isLoading(val: boolean) {
    this._isLoading = val;
  }
  private setLoader(bool: boolean) {
    this.isLoading = bool;
    this.refreshBtn.classList.toggle('active');
  }
  private onError(e: unknown) {
    console.log(String(e));
  }
  private onSuccess = (data: ICoords | PermissionState) => {
    if (typeof data !== 'string') {
      this.config.coord = data;
    } else if (!this.config.q) this.config.q = 'Ukraine';
    this.getWeather(this.config);
  };
  private getGeolocation = async (): Promise<ICoords | PermissionState> => {
    const result = await navigator.permissions.query({ name: 'geolocation' });
    if (result.state === 'granted' || result.state === 'prompt') {
      return await new Promise(res => {
        navigator.geolocation.getCurrentPosition(function (position) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          res({ lat, lon });
        });
      });
    } else {
      return result.state;
    }
  };
  private makeIconUrl(iconstring: string): string {
    return `${this.#ICON_URL + iconstring}@2x.png`;
  }
  private makeUrl(config: IWeatherConfig): string {
    let url = this.#API_URL;

    url += makeQueryParamsString(config);
    url += `appid=${this.#API_KEY}`;
    return url;
  }
  private normalizeState({
    main,
    weather,
    wind,
    name,
  }: IApiResponse): IWeatherState {
    return {
      tempeture: main.temp,
      feels_like: main.feels_like,
      pressure: main.pressure,
      icon: weather?.[0].icon ? this.makeIconUrl(weather[0].icon) : null,
      iconDesrtiption: weather[0].description,
      windSpeed: wind.speed,
      humidity: main.humidity,
      name,
    };
  }
  async getWeather(stateConfig: IWeatherConfig): Promise<void> {
    try {
      if (this.abortController) {
        this.abortController.abort('Request aborted!');
      }
      this.setLoader(true);

      this.abortController = new AbortController();
      // await wait(1000);
      const response = await fetch(this.makeUrl(stateConfig), {
        signal: this.abortController.signal,
      });
      const data: Awaited<IApiResponse | IApiError> = await response.json();
      if (!response.ok) {
        const { cod, message } = data as IApiError;
        throw new Error(`${cod} : ${message}`);
      }

      const normalizedState = this.normalizeState(data as IApiResponse);
      this.updateMarkUp(normalizedState);
    } catch (e) {
      this.showErrorNotification(getErrorMessage(e));
    } finally {
      this.setLoader(false);
      this.abortController = null;
    }
  }
}
new Weather();

function trottle<T>(callback: FUNC<T>, wait: number = 500): FUNC<T | void> {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

function wait(waitTime: number = 5000): Promise<any> {
  return new Promise(resolve =>
    setTimeout(() => {
      resolve('');
    }, waitTime)
  );
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}
function makeQueryParamsString(obj: Record<string, any>): string {
  let url = '';
  const configKeys = Object.keys(obj);
  configKeys.forEach(key => {
    if (!obj[key]) return '';
    if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
      url += makeQueryParamsString(obj[key]);
    } else url += `${key}=${obj[key]}&`;
  });
  return url;
}
