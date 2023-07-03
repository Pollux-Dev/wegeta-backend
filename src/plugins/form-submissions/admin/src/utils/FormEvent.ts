import { EventEmitter } from "events";

export default class FormEvent extends EventEmitter {
  private static Instance: FormEvent;

  private constructor() {
    super();
  }

  static GetInstance() {
    if (!this.Instance) {
      this.Instance = new FormEvent();
      return this.Instance;
    } else {
      return this.Instance;
    }
  }
}
