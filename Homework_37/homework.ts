type TimeKeys = 'minutes' | 'seconds';
type TimeValue = 'string' | number | Date;
type OnTickFunc = (minutes: number, seconds: number) => unknown;
type TimeMap = Record<TimeKeys, TimeValue>;
interface IELEMENTConfig {
  type?: keyof HTMLElementTagNameMap;
  attr?: { [s: string]: string };
  content?: string;
}

const form = document.querySelector<HTMLFormElement>('.form');
const list = document.querySelector<HTMLLIElement>('.list');

class Timer {
  private readonly minutes: number;
  private readonly seconds: number;
  private current: number;
  callback?: OnTickFunc;
  interval: ReturnType<typeof setInterval>;
  constructor(time: TimeMap, callback?: OnTickFunc) {
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
  toogleInterval(id?: number): ReturnType<typeof setInterval> | void {
    if (id) clearInterval(id);
    else {
      this.interval = setInterval(this.update.bind(this), 1000);
      return this.interval;
    }
  }
}

form?.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();
  const formData = new FormData(e.target as HTMLFormElement);
  const timeMap = Object.fromEntries(formData) as TimeMap;
  const el = createEl({ type: 'li' }) as HTMLLIElement;
  const btn = createEl({
    type: 'button',
    attr: { class: 'btn btn-warning', type: 'button' },
    content: 'stop',
  });
  const digits = createEl({ type: 'p' }) as HTMLParagraphElement;

  const timer = new Timer(timeMap, handleOnTick(el));

  el.appendChild(digits);
  el.appendChild(btn);
  list?.appendChild(el);
  btn.addEventListener(
    'click',
    handlePauseTimer(timer.toogleInterval.bind(timer))
  );
  el.setAttribute('data-interval-id', String(timer.interval));
});

function handlePauseTimer(
  toggleCallback: (id?: number) => void | ReturnType<typeof setInterval>
) {
  return (e: Event) => {
    const target = e.target as HTMLButtonElement;
    const timerId = target.parentElement?.getAttribute('data-interval-id');
    if (!timerId) {
      const intervalId = toggleCallback();
      target.parentElement?.setAttribute(
        'data-interval-id',
        String(intervalId)
      );
    } else {
      toggleCallback(Number(timerId));
      target.parentElement?.removeAttribute('data-interval-id');
    }
  };
}

function handleOnTick(target: HTMLLIElement): OnTickFunc {
  return (minutes, seconds) => {
    if (!target?.firstChild) return;
    if (minutes === 0 && seconds === 0) target.lastChild?.remove();
    target.firstChild.textContent = `${String(minutes).padStart(
      2,
      '0'
    )} : ${String(seconds).padStart(2, '0')}`;
  };
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
