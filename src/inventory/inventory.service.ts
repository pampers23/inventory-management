import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../products/models/product.model';
import {
  InventoryTransaction,
  TransactionType,
} from './models/inventory-transaction.model';
import { StockDto } from './dto/stock.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,

    @InjectModel(InventoryTransaction)
    private readonly inventoryModel: typeof InventoryTransaction,
  ) {}

  async create(stockInDto: StockDto) {
    const product = await this.productModel.findByPk(stockInDto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    product.stock += stockInDto.quantity;

    await product.save();

    await this.inventoryModel.create({
      productId: stockInDto.productId,
      quantity: stockInDto.quantity,
      remarks: stockInDto.remarks,
      type: TransactionType.IN,
    });

    return {
      message: 'Stock added successfully',
      product,
    };
  }

  async stockOut(stockOutDto: StockDto) {
    const product = await this.productModel.findByPk(stockOutDto.productId);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.stock < stockOutDto.quantity) {
      throw new BadRequestException('Insuffcient Stock');
    }

    product.stock -= stockOutDto.quantity;

    await product.save();

    await this.inventoryModel.create({
      productId: stockOutDto.productId,
      quantity: stockOutDto.quantity,
      remarks: stockOutDto.remarks,
      type: TransactionType.OUT,
    });

    return { product, message: 'Stock remove successfully' };
  }
}
