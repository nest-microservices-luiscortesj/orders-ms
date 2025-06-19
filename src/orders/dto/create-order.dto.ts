import { IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus } from "generated/prisma";
import { OrderStatusList } from "src/enum/order.enum";

export class CreateOrderDto {
  @IsNumber()
  @IsPositive()
  userId: number;
  @IsEnum(OrderStatusList, {
    message: `Possible status values are ${OrderStatusList}`
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING
}
