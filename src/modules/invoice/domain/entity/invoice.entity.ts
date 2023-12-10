import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "./Invoice-items.entity";
import Address from "./value-object/address.value-object";

type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  address: Address;
  items: InvoiceItems[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  _name: string;
  _document: string;
  _address: Address;
  _items: InvoiceItems[];

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = props.address;
    this._items = props.items;
    this.updatedAt = props.updatedAt || new Date();
    this.createdAt = props.createdAt || new Date();
    this.validate();
  }

  validate() {
    if (!this.name || this.name.length < 3) {
      this.addError("Nome inválido, deve ter no mínimo 3 caracteres");
    }
    if (!this.document || this.document.length < 3) {
      this.addError("Documento inválido, deve ter no mínimo 3 caracteres");
    }
    if (!this.address) {
      this.addError("Endereço inválido, deve ser informados");
    } else if (!this.address.city || this.address.city.length < 2) {
      this.addError("Cidade inválida, deve ter no mínimo 2 caracteres");
    } else if (!this.address.street || this.address.street.length < 3) {
      this.addError("Rua inválida, deve ter no mínimo 3 caracteres");
    } else if (!this.address.number || this.address.number.length < 1) {
      this.addError("Número inválido, deve ter no mínimo 1 caracter");
    } else if (!this.address.zipCode || this.address.zipCode.length < 8) {
      this.addError("CEP inválido");
    } else if (!this.address.state || this.address.state.length < 2) {
      this.addError("Estado inválido");
    }
    if (!this.items) {
      this.addError("Itens inválidos, deve ser informado 1 ou mais itens");
    } else {
      this.items.forEach((item) => {
        if (item.hasErrors()) {
          this.getErros().push(...item.getErros());
        }
      });
    }
  }

  get total(): number {
    if (this.items) {
      let total = 0;
      this.items.forEach((i) => {
        total += i.price;
      });
      return total;
    }
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): InvoiceItems[] {
    return this._items;
  }
}
