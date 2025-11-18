import { Order } from "../Order";
import { Product } from "../../product/Product";

export interface CreateOrderRepository {
  save(order: Order): Promise<void>;
  findProductById(productId: number): Promise<Product | null>;
  deleteAllOrders(): Promise<void>;
}
