import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
} from 'class-validator';
import { TransactionType } from '../models/inventory-transaction.model';

export class StockDto {
  @IsInt()
  productId!: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type!: TransactionType;

  @IsPositive()
  quantity!: number;

  @IsNotEmpty()
  @IsString()
  remarks!: string;
}
