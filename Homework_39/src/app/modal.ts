import { DBRecord, Nullable } from './types';

export class Modal {
  private _modal: Nullable<HTMLDivElement>;
  private _text: Nullable<HTMLParagraphElement>;
  private _title: Nullable<HTMLHeadElement>;
  constructor() {
    this._modal = document.querySelector('.modal');
    this._text = document.querySelector<HTMLParagraphElement>('[data-bs-text]');
    this._title = document.querySelector<HTMLHeadElement>('[data-bs-title]');
    this._modal?.addEventListener('click', this.closeModal);
  }
  public closeModal = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.getAttribute('data-bs-dismiss')) {
      this._modal?.classList.toggle('show-modal');
    }
  };
  public openModal({ value, status }: DBRecord, id: string) {
    if (this._modal) this._modal.classList.toggle('show-modal');
    if (this._text) this._text.innerText = value;
    if (this._title) this._title.innerText = `Task#${id} Status:${status}`;
  }
}
