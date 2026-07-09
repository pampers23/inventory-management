import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { HasMany } from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';

interface CategoryAttributes {
  id: number;
  name: string;
  description: string;
}

type CategoryCreationAttributes = Optional<CategoryAttributes, 'id'>;

@Table({
  tableName: 'categories',
  timestamps: true,
})
export class Category extends Model<
  CategoryAttributes,
  CategoryCreationAttributes
> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
  })
  declare id: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @HasMany(() => Product)
  declare products: Product;
}
