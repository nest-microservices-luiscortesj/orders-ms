import { IsEnum, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatusList } from '../enum/order.enum';
import { OrderStatus } from 'generated/prisma';


export class OrderPaginationDto extends PaginationDto {

  @IsNumber()
  @IsPositive()
  id: number;
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Valid status are ${OrderStatusList}`
  })
  status: OrderStatus;


}