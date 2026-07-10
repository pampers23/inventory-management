import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InventoryTransaction } from './models/inventory-transaction.model';
import { Product } from '../products/models/product.model';

@Module({
  imports: [SequelizeModule.forFeature([InventoryTransaction, Product])],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
