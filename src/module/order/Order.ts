import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderItem } from "./OrderItem";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id: number;

  @CreateDateColumn()
  public createdAt: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    eager: true,
  })
  public orderItems: OrderItem[];

  constructor({ orderItems }: { orderItems: OrderItem[] }) {
    this.orderItems = orderItems;
    const totalPrice = this.calculateTotalPrice();
    this.validateTotalPrice(totalPrice);
  }

  private calculateTotalPrice(): number {
    return this.orderItems.reduce(
      (total, item) => total + item.getItemTotal(),
      0
    );
  }

  private validateTotalPrice(totalPrice: number) {
    if (totalPrice > 200) {
      throw new Error("Le prix total de la commande ne peut pas dépasser 200¬");
    }
  }

  public getTotalPrice(): number {
    return this.calculateTotalPrice();
  }
}
