"use strict";
const form = document.querySelector('.form');
const list = document.querySelector('.list');
class Timer {
    minutes;
    seconds;
    current;
    callback;
    interval;
    constructor(time, callback) {
        this.minutes = +time.minutes;
        this.seconds = +time.seconds;
        this.current = this.minutes * 60 + this.seconds;
        this.callback = callback;
        this.interval = setInterval(this.update.bind(this), 1000);
    }
    update() {
        const minutes = Math.floor(this.current / 60);
        const seconds = this.current % 60;
        this.callback?.(minutes, seconds);
        if (this.current === 0) {
            this.toogleInterval(this.interval);
        }
        this.current--;
    }
    toogleInterval(id) {
        if (id)
            clearInterval(id);
        else {
            this.interval = setInterval(this.update.bind(this), 1000);
            return this.interval;
        }
    }
}
form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const timeMap = Object.fromEntries(formData);
    const el = createEl({ type: 'li' });
    const btn = createEl({
        type: 'button',
        attr: { class: 'btn btn-warning', type: 'button' },
        content: 'stop',
    });
    const digits = createEl({ type: 'p' });
    const timer = new Timer(timeMap, handleOnTick(el));
    el.appendChild(digits);
    el.appendChild(btn);
    list?.appendChild(el);
    btn.addEventListener('click', handlePauseTimer(timer.toogleInterval.bind(timer)));
    el.setAttribute('data-interval-id', String(timer.interval));
});
function handlePauseTimer(toggleCallback) {
    return (e) => {
        const target = e.target;
        const timerId = target.parentElement?.getAttribute('data-interval-id');
        if (!timerId) {
            const intervalId = toggleCallback();
            target.parentElement?.setAttribute('data-interval-id', String(intervalId));
        }
        else {
            toggleCallback(Number(timerId));
            target.parentElement?.removeAttribute('data-interval-id');
        }
    };
}
function handleOnTick(target) {
    return (minutes, seconds) => {
        if (!target?.firstChild)
            return;
        if (minutes === 0 && seconds === 0)
            target.lastChild?.remove();
        target.firstChild.textContent = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    };
}
function createEl({ type = 'div', attr, content }) {
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
