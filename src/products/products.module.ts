import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [SequelizeModule.forFeature([Product]), CategoriesModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
