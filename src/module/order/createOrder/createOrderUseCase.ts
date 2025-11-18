import { CreateOrderRepository } from "./createOrderRepository";
import { Order } from "../Order";
import { OrderItem } from "../OrderItem";

export class CreateOrderUseCase {
  private orderRepository: CreateOrderRepository;

  constructor(orderRepository: CreateOrderRepository) {
    this.orderRepository = orderRepository;
  }

  async execute({
    productId,
    quantity,
  }: {
    productId: number;
    quantity: number;
  }): Promise<void> {
    // Récupérer le produit
    const product = await this.orderRepository.findProductById(productId);

    if (!product) {
      throw new Error("Le produit n'existe pas");
    }

    // Supprimer toutes les commandes existantes (règle métier)
    await this.orderRepository.deleteAllOrders();

    // Créer l'OrderItem avec le prix du produit au moment de la commande
    const orderItem = new OrderItem({
      productId: product.id,
      productPrice: product.price,
      quantity: quantity,
    });

    // Créer la commande avec l'OrderItem
    const order = new Order({
      orderItems: [orderItem],
    });

    try {
      await this.orderRepository.save(order);
    } catch (error) {
      throw new Error("erreur lors de la création de la commande");
    }
  }
}
