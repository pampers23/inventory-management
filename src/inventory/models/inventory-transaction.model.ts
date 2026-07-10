import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';
import { Optional } from 'sequelize';

export enum TransactionType {
  IN = 'IN',
  OUT = 'OUT',
}

interface InventoryTransactionAttributes {
  id: number;
  productId: number;
  type: TransactionType;
  quantity: number;
  remarks: string;
}

type InventoryTransactionCreationAttributes = Optional<
  InventoryTransactionAttributes,
  'id' | 'remarks'
>;

@Table({
  tableName: 'inventory_transactions',
  timestamps: true,
})
export class InventoryTransaction extends Model<
  InventoryTransactionAttributes,
  InventoryTransactionCreationAttributes
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @ForeignKey(() => Product)
  @Column({
    allowNull: false,
  })
  declare productId: number;

  @BelongsTo(() => Product)
  declare product: Product;

  @Column({
    type: DataType.ENUM('IN', 'OUT'),
    allowNull: false,
  })
  type!: TransactionType;

  @Column({
    allowNull: false,
  })
  declare quantity: number;

  @Column({
    type: DataType.TEXT,
  })
  declare remarks: string;
}
