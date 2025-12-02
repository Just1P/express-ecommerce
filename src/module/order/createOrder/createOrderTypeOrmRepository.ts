import { CreateOrderRepository } from "./createOrderRepository";
import { Order } from "../Order";
import { Product } from "../../product/Product";
import AppDataSource from "../../../config/db.config";

export class CreateOrderTypeOrmRepository implements CreateOrderRepository {
  async save(order: Order): Promise<void> {
    const orderRepository = AppDataSource.getRepository<Order>(Order);
    await orderRepository.save(order);
  }

  async findProductById(productId: number): Promise<Product | null> {
    const productRepository = AppDataSource.getRepository<Product>(Product);
    return await productRepository.findOneBy({ id: productId });
  }

  async deleteAllOrders(): Promise<void> {
    const orderRepository = AppDataSource.getRepository<Order>(Order);
    await orderRepository.clear();
  }
}
