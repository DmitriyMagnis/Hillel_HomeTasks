'use strict';
class Slider {
    constructor(options) {
        this.options = Object.assign({ dots: true, wrapper: '.slider' }, options);
        this.track = null;
        this.trackWidth = null;
        this.items = [];
        this.currentPosition = 0;
        this.prevArrow = null;
        this.nextArrow = null;
        this.dotContainer = null;
        this.init();
    }
    init() {
        this.setTrack();
        this.setTrackWidth();
        this.setSliderItems();
        this.setArrowBtns();
        this.setDots();
        this.setEvents();
        console.log(this);
    }
    setTrack() {
        const wrapper = document.querySelector('.slider__track');
        this.track = wrapper;
    }
    setTrackWidth() {
        if (!this.track)
            return;
        this.trackWidth = this.track.getBoundingClientRect().width;
    }
    setSliderItems() {
        const sliderItems = document.querySelectorAll('.slider__frame');
        console.log(sliderItems);
        this.items = Array.from(sliderItems);
    }
    setArrowBtns() {
        const prev = document.querySelector('.slider__arrows-prev');
        const next = document.querySelector('.slider__arrows-next');
        if (this.items.length <= 1) {
            prev === null || prev === void 0 ? void 0 : prev.remove();
            next === null || next === void 0 ? void 0 : next.remove();
            return;
        }
        this.prevArrow = prev;
        this.nextArrow = next;
        this.handleArrows();
    }
    setDots() {
        if (!this.options.dots || this.items.length <= 1)
            return;
        const dotsContainer = document.querySelector('.slider__dots');
        if (!dotsContainer)
            return;
        const dotItems = this.items.reduce((frag, slideItem, i) => {
            const newDot = createEl({
                attr: {
                    class: `slider__dots-item ${!i ? 'active' : ''}`,
                    'data-index': String(i),
                },
            });
            frag.append(newDot);
            return frag;
        }, new DocumentFragment());
        dotsContainer.appendChild(dotItems);
        this.dotContainer = dotsContainer;
    }
    setEvents() {
        if (!this.nextArrow || !this.prevArrow)
            return;
        this.nextArrow.addEventListener('click', this.next.bind(this));
        this.prevArrow.addEventListener('click', this.prev.bind(this));
        if (!this.dotContainer || !this.options.dots)
            return;
        this.dotContainer.addEventListener('click', this.dotsEvent.bind(this));
    }
    dotsEvent(e) {
        const target = e.target;
        if (target.classList.contains('slider__dots-item')) {
            this.moveTo(Number(target.getAttribute('data-index')));
        }
    }
    moveTo(pos) {
        if (!this.track || !this.trackWidth)
            return;
        this.currentPosition = pos;
        this.track.style.cssText = `transform: translate(-${this.currentPosition * this.trackWidth + 5 + 'px'});`;
        this.handleArrows();
        this.handleActiveDots();
    }
    handleActiveDots() {
        if (!this.dotContainer)
            return;
        Array.from(this.dotContainer.children).forEach(dotItem => {
            const elementIdx = Number(dotItem.getAttribute('data-index'));
            if (elementIdx === this.currentPosition) {
                dotItem.classList.add('active');
            }
            else
                dotItem.classList.remove('active');
        });
    }
    next() {
        if (!this.track || !this.trackWidth)
            return;
        this.currentPosition += 1;
        this.track.style.cssText = `transform: translate(-${this.currentPosition * this.trackWidth + 5 + 'px'});`;
        this.handleArrows();
        this.handleActiveDots();
    }
    prev() {
        if (!this.track || !this.trackWidth)
            return;
        this.currentPosition -= 1;
        this.track.style.cssText = `transform: translate(-${this.currentPosition * this.trackWidth + 5 + 'px'});`;
        this.handleArrows();
        this.handleActiveDots();
    }
    handleArrows() {
        var _a, _b, _c, _d, _e, _f;
        if (this.currentPosition === 0) {
            (_a = this.prevArrow) === null || _a === void 0 ? void 0 : _a.classList.add('disabled');
            (_b = this.nextArrow) === null || _b === void 0 ? void 0 : _b.classList.remove('disabled');
        }
        else if (this.currentPosition === this.items.length - 1) {
            (_c = this.nextArrow) === null || _c === void 0 ? void 0 : _c.classList.add('disabled');
            (_d = this.prevArrow) === null || _d === void 0 ? void 0 : _d.classList.remove('disabled');
        }
        else {
            (_e = this.prevArrow) === null || _e === void 0 ? void 0 : _e.classList.remove('disabled');
            (_f = this.nextArrow) === null || _f === void 0 ? void 0 : _f.classList.remove('disabled');
        }
    }
}
const sliderr2 = new Slider({ wrapper: '.slider', dots: true });
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
