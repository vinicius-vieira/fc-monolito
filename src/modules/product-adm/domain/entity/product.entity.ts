import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import EventDispatcher from "../../../@shared/domain/event/event-dispatcher";
import ValidatorInterface from "../../../@shared/domain/validator/validator.interface";
import Id from "../../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
  purchasePrice: number;
  stock: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Product
  extends BaseEntity
  implements AggregateRoot, ValidatorInterface<Product>
{
  private _name: string;
  private _description: string;
  private _purchasePrice: number;
  private _stock: number;

  constructor(props: ProductProps, eventDispatcher?: EventDispatcher) {
    super(props.id, eventDispatcher);
    this._name = props.name;
    this._description = props.description;
    this._purchasePrice = props.purchasePrice;
    this._stock = props.stock;
    this.validate();
  }

  validate(): void {
    if (this._name === null || this._name.length < 2) {
      this.addError("Nome inválido, deve ter no mínimo 2 caracteres.");
    }

    if (this._description === null || this._description.length > 2) {
      this.addError("Descriação inválida, deve ter no mínimo 2 caracteres.");
    }

    if (this._purchasePrice <= 0.0) {
      this.addError("Preço inválido, deve ser maior que 0,00.");
    }

    if (this._stock < 0.0) {
      this.addError("Estoque inválido, não pode ser negativo.");
    }
  }

  public getName(): string {
    return this._name;
  }

  public setName(name: string): void {
    this._name = name;
    this.validate();
  }

  public getDescription(): string {
    return this._description;
    this.validate();
  }

  public setDescription(description: string): void {
    this._description = description;
    this.validate();
  }

  public getPurchasePrice(): number {
    return this._purchasePrice;
  }

  public setPurchasePrice(purchasePrice: number): void {
    this._purchasePrice = purchasePrice;
    this.validate();
  }

  public getStock(): number {
    return this._stock;
  }

  public setStock(stock: number): void {
    this._stock = stock;
    this.validate();
  }
}
