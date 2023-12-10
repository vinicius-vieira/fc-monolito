import { UpdatedAt } from "sequelize-typescript";
import AggregateRoot from "../../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/domain/entity/base.entity";
import Id from "../../../@shared/domain/value-object/id.value-object";

type TrasancionProps = {
  id?: Id;
  amount: number;
  orderId: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Transaction extends BaseEntity implements AggregateRoot {
  private _amount: number;
  private _orderId: string;
  private _status: string;

  constructor(props: TrasancionProps) {
    super(props.id);
    this._amount = props.amount;
    this._orderId = props.orderId;
    this._status = props.status || "pedding";
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
    this.validate();
  }

  get amount(): number {
    return this._amount;
  }

  get orderId(): string {
    return this._orderId;
  }

  get status(): string {
    return this._status;
  }

  validate(): void {
    if (this.amount <= 0.0) {
      this.addError("Total inválido, deve ser maior que 0.");
    }
  }

  approve(): void {
    this._status = "approved";
  }

  decline(): void {
    this._status = "declined";
  }

  process(): void {
    if (this.amount >= 100) {
      this.approve();
    } else {
      this.decline();
      this.addError("Apenas transação com valor maior que 100.0 será aprovada");
    }
  }
}
