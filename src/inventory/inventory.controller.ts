import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { InventoryService } from './inventory.service';
import { StockDto } from './dto/stock.dto';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('add-stock')
  create(@Body() dto: StockDto) {
    return this.inventoryService.create(dto);
  }
}
