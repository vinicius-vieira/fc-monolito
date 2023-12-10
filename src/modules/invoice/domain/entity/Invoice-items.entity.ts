import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

type InvoiceItemsProps = {
  id?: Id;
  name: string;
  price: number;
};

export default class InvoiceItems extends BaseEntity {
  _name: string;
  _price: number;

  constructor(props: InvoiceItemsProps) {
    super(props.id);
    this._name = props.name;
    this._price = props.price;
    this.validate();
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  validate() {
    if (this.price <= 0) {
      this.addError("Preço inválido, dever ser maior que 0");
    }

    if (!this.name || this.name.length < 3) {
      this.addError("Nome inválido, deve ter no mínimo 3 caracteres");
    }
  }
}
