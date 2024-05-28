class View {
    wrapper;
    humidity;
    date;
    pressure;
    wind;
    tempeture;
    feelsLike;
    enviroment;
    icon;
    refreshBtn;
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
        this.wrapper.append(this.date, this.icon, this.humidity, this.pressure, this.wind, this.tempeture, this.feelsLike, this.enviroment, this.refreshBtn);
        this.refreshBtn.addEventListener('click', this.refreshEvent.bind(this));
        document.body.appendChild(this.wrapper);
    }
    refreshEvent(e) {
        this.getWeather(this.config);
    }
    updateMarkUp(data) {
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
    createEl({ type, attr, content, }) {
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
    country: 'Ukraine',
    lang: 'en',
    units: 'metric',
    coords: null,
};
class Weather extends View {
    #API_KEY = '33e6b457abb9ed010bd7c6e30e06a810';
    #API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
    #ICON_URL = 'https://openweathermap.org/img/wn/';
    config;
    isLoading = false;
    constructor(config) {
        super();
        this.config = { ...defaultConf, ...config };
        this.getWeather(this.config);
    }
    makeIconUrl(iconstring) {
        return `${this.#ICON_URL + iconstring}@2x.png`;
    }
    setLoader(bool) {
        this.isLoading = bool;
        this.refreshBtn.classList.toggle('active');
    }
    makeUrl(config) {
        let url = this.#API_URL;
        const configKeys = Object.keys(config);
        configKeys.forEach(key => {
            if (!config[key])
                return;
            const urlKey = key === 'country' ? 'q' : key;
            url += `${urlKey}=${config[key]}&`;
        });
        url += `appid=${this.#API_KEY}`;
        return url;
    }
    normalizeState({ main, weather, wind }) {
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
    async getWeather(data2) {
        try {
            this.setLoader(true);
            await wait(2000);
            const response = await fetch(this.makeUrl(data2));
            if (!response.ok)
                throw Error('Api error');
            const data = await response.json();
            const normalizedState = this.normalizeState(data);
            this.updateMarkUp(normalizedState);
            console.log(normalizedState, data);
        }
        catch (e) {
        }
        finally {
            this.setLoader(false);
        }
    }
}
new Weather({
    units: 'metric',
    country: 'Kiev',
});
function wait(time = 5000) {
    return new Promise(resolve => setTimeout(() => {
        resolve('');
    }, time));
}
export {};
