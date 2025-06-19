import { IsEnum, IsNumber } from 'class-validator';
import { OrderStatusList } from '../enum/order.enum';
import { OrderStatus } from 'generated/prisma';



export class ChangeOrderStatusDto {

  @IsNumber()
  id: number;

  @IsEnum( OrderStatusList, {
    message: `Valid status are ${ OrderStatusList }`
  })
  status: OrderStatus;


}