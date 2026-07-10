import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Category } from '../../categories/models/category.model';
import { Optional } from 'sequelize';

interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

type ProductCreationAttributes = Optional<ProductAttributes, 'id'>;

@Table({
  tableName: 'products',
  timestamps: true,
})
export class Product extends Model<
  ProductAttributes,
  ProductCreationAttributes
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;

  @Column({
    allowNull: false,
    defaultValue: 0,
  })
  declare stock: number;

  @ForeignKey(() => Category)
  @Column({
    allowNull: false,
  })
  declare categoryId: number;

  @BelongsTo(() => Category)
  declare category: Category;
}
