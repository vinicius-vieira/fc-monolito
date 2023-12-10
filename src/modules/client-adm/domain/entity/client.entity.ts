import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";

type ClientProps = {
  id?: Id;
  name: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Client extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _email: string;
  private _address: string;

  constructor(props: ClientProps) {
    super(props.id);
    this._name = props.name;
    this._email = props.email;
    this._address = props.address;
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

  get address(): string {
    return this._address;
  }
  set address(value) {
    this._address = value;
  }
}
