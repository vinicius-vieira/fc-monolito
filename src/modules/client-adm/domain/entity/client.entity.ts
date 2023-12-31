import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _document: string;
  private _street: string;
  private _number: string;
  private _complement: string;
  private _city: string;
  private _state: string;
  private _zipCode: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._document = props.document;
    this._street = props.street;
    this._number = props.number;
    this._complement = props.complement;
    this._city = props.city;
    this._state = props.state;
    this._zipCode = props.zipCode;
  }

  get name(): string {
    return this._name;
  }
  set name(value) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value) {
    this._email = value;
  }

  get street(): string {
    return this._street;
  }
  set street(value) {
    this._street = value;
  }

  get number(): string {
    return this._number;
  }
  set number(value) {
    this._number = value;
  }

  get complement(): string {
    return this._complement;
  }
  set complement(value) {
    this._complement = value;
  }

  get city(): string {
    return this._city;
  }
  set city(value) {
    this._city = value;
  }
  get zipCode(): string {
    return this._zipCode;
  }
  set zipCode(value) {
    this._zipCode = value;
  }
  get document(): string {
    return this._document;
  }
  set document(value) {
    this._document = value;
  }

  get state(): string {
    return this._state;
  }
  set state(value) {
    this._state = value;
  }
}
