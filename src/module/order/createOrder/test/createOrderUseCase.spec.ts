import { describe, expect, test } from "@jest/globals";
import { CreateOrderRepository } from "../createOrderRepository";
import { CreateOrderUseCase } from "../createOrderUseCase";
import { Order } from "../../Order";
import { Product } from "../../../product/Product";

class CreateOrderDummyRepository implements CreateOrderRepository {
  async save(order: Order): Promise<void> {
    // Ne fait rien, c'est un dummy
  }

  async findProductById(productId: number): Promise<Product | null> {
    // Retourne un produit mock pour les tests
    if (productId === 1) {
      return new Product({
        title: "Switch 2",
        description: "nouvelle console",
        price: 50,
      });
    }
    return null;
  }

  async deleteAllOrders(): Promise<void> {
    // Ne fait rien, c'est un dummy
  }
}

describe("US-3 : Créer une commande avec des produits", () => {
  test("Scénario 1 : création réussie d'une commande", async () => {
    // Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 50€
    // Et qu'il n'y a aucune commande enregistrée
    const createOrderRepository = new CreateOrderDummyRepository();
    const createOrderUseCase = new CreateOrderUseCase(createOrderRepository);

    await expect(
      // Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 2
      createOrderUseCase.execute({
        productId: 1,
        quantity: 2,
      })
      // Alors la commande doit être créée avec succès
    ).resolves.not.toThrow();
  });
});
