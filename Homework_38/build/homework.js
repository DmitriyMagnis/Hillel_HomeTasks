class View {
    wrapper;
    humidity;
    date;
    pressure;
    wind;
    tempeture;
    feelsLike;
    enviroment;
    place;
    icon;
    search;
    errorContainer;
    refreshBtn;
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
        this.wrapper.append(this.date, this.icon, this.place, this.humidity, this.pressure, this.wind, this.tempeture, this.feelsLike, this.enviroment, this.refreshBtn);
        this.search.addEventListener('input', trottle(this.onSearchEvent, 500));
        this.refreshBtn.addEventListener('click', this.refreshEvent);
        document.body.append(this.search, this.wrapper);
        document.body.appendChild(this.errorContainer);
    }
    onSearchEvent = (e) => {
        const target = e.target;
        this.getWeather({ ...this.config, q: target.value });
    };
    refreshEvent = () => {
        this.getWeather(this.config);
    };
    showErrorNotification = (message, errorTimeout = 6000) => {
        let timeId = setTimeout(() => {
            const item = Array.from(this.errorContainer.children).find(item => item.getAttribute('dataId') === String(timeId));
            if (item)
                item.remove();
        }, errorTimeout);
        const errorItem = View.createEl({
            type: 'li',
            attr: { class: 'error__item', dataId: String(timeId) },
            content: message,
        });
        this.errorContainer.appendChild(errorItem);
    };
    updateMarkUp(data) {
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
    static createEl({ type, attr, content, }) {
        const _el = document.createElement(type);
        if (content)
            _el.textContent = content;
        if (attr) {
            Object.entries(attr).forEach(([key, value]) => {
                _el.setAttribute(key, value);
            });
        }
        return _el;
    }
}
const defaultConf = {
    lang: 'en',
    units: 'metric',
    coord: null,
};
class Weather extends View {
    #API_KEY = '33e6b457abb9ed010bd7c6e30e06a810';
    #API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    #ICON_URL = 'https://openweathermap.org/img/wn/';
    config;
    abortController;
    _isLoading = false;
    constructor(config) {
        super();
        this.config = { ...defaultConf, ...config };
        this.init();
    }
    async init() {
        try {
            const data = await this.getGeolocation();
            this.onSuccess(data);
        }
        catch (e) {
            this.onError(e);
        }
    }
    set isLoading(val) {
        this._isLoading = val;
    }
    setLoader(bool) {
        this.isLoading = bool;
        this.refreshBtn.classList.toggle('active');
    }
    onError(e) {
        console.log(String(e));
    }
    onSuccess = (data) => {
        if (typeof data !== 'string') {
            this.config.coord = data;
        }
        else if (!this.config.q)
            this.config.q = 'Ukraine';
        this.getWeather(this.config);
    };
    getGeolocation = async () => {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        if (result.state === 'granted' || result.state === 'prompt') {
            return await new Promise(res => {
                navigator.geolocation.getCurrentPosition(function (position) {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    res({ lat, lon });
                });
            });
        }
        else {
            return result.state;
        }
    };
    makeIconUrl(iconstring) {
        return `${this.#ICON_URL + iconstring}@2x.png`;
    }
    makeUrl(config) {
        let url = this.#API_URL;
        url += makeQueryParamsString(config);
        url += `appid=${this.#API_KEY}`;
        return url;
    }
    normalizeState({ main, weather, wind, name, }) {
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
    async getWeather(stateConfig) {
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
            const data = await response.json();
            if (!response.ok) {
                const { cod, message } = data;
                throw new Error(`${cod} : ${message}`);
            }
            const normalizedState = this.normalizeState(data);
            this.updateMarkUp(normalizedState);
        }
        catch (e) {
            this.showErrorNotification(getErrorMessage(e));
        }
        finally {
            this.setLoader(false);
            this.abortController = null;
        }
    }
}
new Weather();
function trottle(callback, wait = 500) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(...args);
        }, wait);
    };
}
function wait(waitTime = 5000) {
    return new Promise(resolve => setTimeout(() => {
        resolve('');
    }, waitTime));
}
function getErrorMessage(error) {
    if (error instanceof Error)
        return error.message;
    return String(error);
}
function makeQueryParamsString(obj) {
    let url = '';
    const configKeys = Object.keys(obj);
    configKeys.forEach(key => {
        if (!obj[key])
            return '';
        if (typeof obj[key] === 'object' && !(obj[key] instanceof Array)) {
            url += makeQueryParamsString(obj[key]);
        }
        else
            url += `${key}=${obj[key]}&`;
    });
    return url;
}
export {};
