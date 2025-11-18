import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: "int" })
  public productId: number;

  @Column({ type: "float" })
  public productPrice: number;

  @Column({ type: "int" })
  public quantity: number;

  @ManyToOne(() => Order, (order) => order.orderItems)
  public order: Order;

  constructor({
    productId,
    productPrice,
    quantity,
  }: {
    productId: number;
    productPrice: number;
    quantity: number;
  }) {
    this.validateQuantity(quantity);
    this.productId = productId;
    this.productPrice = productPrice;
    this.quantity = quantity;
  }

  private validateQuantity(quantity: number) {
    if (quantity <= 0) {
      throw new Error("La quantité doit être supérieure à 0");
    }

    if (quantity > 3) {
      throw new Error("La quantité ne peut pas dépasser 3");
    }
  }

  public getItemTotal(): number {
    return this.productPrice * this.quantity;
  }
}
