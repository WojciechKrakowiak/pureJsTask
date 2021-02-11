class Template {
  _id: string;
  _value: string;

  constructor(id: string, value: string) {
    this._id = id;
    this._value = value;
  }

  get id() {
    return this._id;
  }
  get value() {
    return this._value;
  }
}

export default Template;
