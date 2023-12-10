import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import InvoiceModel from "./invoice.model";

@Table({
  tableName: "invoicesitems",
  timestamps: false,
})
export default class InvoiceItemsModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, type: DataType.DECIMAL })
  price: number;

  @ForeignKey(() => InvoiceModel)
  @Column
  invoiceId: string;
}
