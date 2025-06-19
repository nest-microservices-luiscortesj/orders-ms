import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class OrdersService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger();
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
  create(createOrderDto: CreateOrderDto) {
    return this.order.create({
      data: createOrderDto
    })
  }
  async findOne(id: number) {
    const order = await this.order.findFirst({
      where: { id }
    });

    if (!order) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Order with id ${id} not found`
      });
    }

    return order;
  }

  async findAll(orderPaginationDto: OrderPaginationDto) {
    const { page = 1, limit = 10, status, id } = orderPaginationDto;

    const whereClause: any = {};

    if (id) whereClause.userId = id;
    if (status) whereClause.status = status;

    const total = await this.order.count({
      where: whereClause,
    });

    const data = await this.order.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereClause,
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
      },
    };
  }

  async changeStatus(changeOrderStatusDto: ChangeOrderStatusDto) {

    const { id, status } = changeOrderStatusDto;

    const order = await this.findOne(id);
    if (order.status === status) {
      return order;
    }

    return this.order.update({
      where: { id },
      data: { status: status }
    });


  }

}
