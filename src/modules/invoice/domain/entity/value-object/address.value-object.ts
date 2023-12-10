import ValueObject from "../../../../@shared/domain/value-object/value-object.interface";

export default class Address implements ValueObject {
  _street: string;
  _number: string;
  _zipCode: string;
  _city: string;
  _complement: string;
  _state: string;

  constructor(
    street: string,
    number: string,
    zip: string,
    city: string,
    state: string,
    complement: string
  ) {
    this._street = street;
    this._number = number;
    this._zipCode = zip;
    this._city = city;
    this._state = state;
    this._complement = complement;
  }

  get street(): string {
    return this._street;
  }

  get number(): string {
    return this._number;
  }

  get zipCode(): string {
    return this._zipCode;
  }

  get city(): string {
    return this._city;
  }

  get state(): string {
    return this._state;
  }

  get complement(): string {
    return this._complement;
  }
}
