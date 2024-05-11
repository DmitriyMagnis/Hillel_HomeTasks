'use strict';
interface ISliderOptions {
  wrapper: string;
  dots: boolean;
}

type Nullable<T> = T | null;

class Slider {
  private options: ISliderOptions;
  private trackWidth: Nullable<number>;
  private items: HTMLDivElement[];
  private track: Nullable<HTMLDivElement>;
  private currentPosition: number;
  private prevArrow: Nullable<HTMLButtonElement>;
  private nextArrow: Nullable<HTMLButtonElement>;
  private dotContainer: Nullable<HTMLElement>;

  constructor(options?: ISliderOptions) {
    this.options = { dots: true, wrapper: '.slider', ...options };

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
    this.initArrowBtns();
    this.initDots();
    this.addEvents();

    console.log(this);
  }
  setTrack() {
    const wrapper = document.querySelector<HTMLDivElement>('.slider__track');
    this.track = wrapper;
  }
  setTrackWidth() {
    if (!this.track) return;
    this.trackWidth = this.track.getBoundingClientRect().width;
  }
  setSliderItems() {
    const sliderItems =
      document.querySelectorAll<HTMLDivElement>('.slider__frame');
    console.log(sliderItems);
    this.items = Array.from(sliderItems);
  }
  initArrowBtns() {
    const prev = document.querySelector('.slider__arrows-prev');
    const next = document.querySelector('.slider__arrows-next');
    if (this.items.length <= 1) {
      prev?.remove();
      next?.remove();
      return;
    }
    this.prevArrow = prev as HTMLButtonElement;
    this.nextArrow = next as HTMLButtonElement;
    this.hadnleArrows();
  }
  initDots() {
    if (!this.options.dots || this.items.length <= 1) return;

    const dotsContainer =
      document.querySelector<HTMLDivElement>('.slider__dots');

    if (!dotsContainer) return;

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
  addEvents() {
    if (!this.nextArrow || !this.prevArrow) return;
    this.nextArrow.addEventListener('click', this.next.bind(this));
    this.prevArrow.addEventListener('click', this.prev.bind(this));

    if (!this.dotContainer || !this.options.dots) return;
    this.dotContainer.addEventListener('click', this.dotsEvent.bind(this));
  }
  dotsEvent(e: Event) {
    const target = e.target as Element;

    if (target.classList.contains('slider__dots-item')) {
      this.moveTo(Number(target.getAttribute('data-index')));
    }
  }
  moveTo(pos: number) {
    if (!this.track || !this.trackWidth) return;
    this.currentPosition = pos;
    this.track.style.cssText = `transform: translate(-${
      this.currentPosition * this.trackWidth + 5 + 'px'
    });`;
    this.hadnleArrows();
    this.handleDots();
  }
  handleDots() {
    if (!this.dotContainer) return;
    Array.from(this.dotContainer.children).forEach(dotItem => {
      const elementIdx = Number(dotItem.getAttribute('data-index'));
      if (elementIdx === this.currentPosition) {
        dotItem.classList.add('active');
      } else dotItem.classList.remove('active');
    });
  }
  next() {
    if (!this.track || !this.trackWidth) return;

    this.currentPosition += 1;

    this.track.style.cssText = `transform: translate(-${
      this.currentPosition * this.trackWidth + 5 + 'px'
    });`;
    this.hadnleArrows();
    this.handleDots();
  }

  prev() {
    if (!this.track || !this.trackWidth) return;

    this.currentPosition -= 1;
    this.track.style.cssText = `transform: translate(-${
      this.currentPosition * this.trackWidth + 5 + 'px'
    });`;
    this.hadnleArrows();
    this.handleDots();
  }
  hadnleArrows() {
    if (this.currentPosition === 0) {
      this.prevArrow?.classList.add('disabled');
      this.nextArrow?.classList.remove('disabled');
    } else if (this.currentPosition === this.items.length - 1) {
      this.nextArrow?.classList.add('disabled');
      this.prevArrow?.classList.remove('disabled');
    } else {
      this.prevArrow?.classList.remove('disabled');
      this.nextArrow?.classList.remove('disabled');
    }
  }
}

const sliderr2 = new Slider({ wrapper: '.slider', dots: true });

interface IELEMENTConfig {
  type?: keyof HTMLElementTagNameMap;
  attr: { [s: string]: string };
  content?: string;
}

function createEl({ type = 'div', attr, content }: IELEMENTConfig) {
  const _el = document.createElement(type);
  if (content) _el.textContent = content;

  if (attr) {
    Object.entries(attr).forEach(([key, value]) => {
      _el.setAttribute(key, value);
    });
  }

  return _el;
}
