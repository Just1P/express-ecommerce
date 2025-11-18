import { describe, expect, test } from "@jest/globals";
import { CreateOrderRepository } from "../createOrderRepository";
import { CreateOrderUseCase } from "../createOrderUseCase";
import { Order } from "../../Order";
import { Product } from "../../../product/Product";

class CreateOrderDummyRepository implements CreateOrderRepository {
  private productPrice: number;

  constructor(productPrice: number = 50) {
    this.productPrice = productPrice;
  }

  async save(order: Order): Promise<void> {
    // Ne fait rien, c'est un dummy
  }

  async findProductById(productId: number): Promise<Product | null> {
    // Retourne un produit mock pour les tests
    if (productId === 1) {
      return new Product({
        title: "Switch 2",
        description: "nouvelle console",
        price: this.productPrice,
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

  test("Scénario 2 : création échouée, prix total dépasse 200€", async () => {
    // Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 120€
    // Et qu'il n'y a aucune commande enregistrée
    const createOrderRepository = new CreateOrderDummyRepository(120);
    const createOrderUseCase = new CreateOrderUseCase(createOrderRepository);

    await expect(
      // Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 3
      createOrderUseCase.execute({
        productId: 1,
        quantity: 3,
      })
      // Alors une erreur doit être envoyée "Le prix total de la commande ne peut pas dépasser 200€"
    ).rejects.toThrow("Le prix total de la commande ne peut pas dépasser 200€");
  });

  test("Scénario 3 : création échouée, quantité supérieure ou égale à 4", async () => {
    // Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 30€
    // Et qu'il n'y a aucune commande enregistrée
    const createOrderRepository = new CreateOrderDummyRepository(30);
    const createOrderUseCase = new CreateOrderUseCase(createOrderRepository);

    await expect(
      // Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 5
      createOrderUseCase.execute({
        productId: 1,
        quantity: 5,
      })
      // Alors une erreur doit être envoyée "La quantité ne peut pas dépasser 3"
    ).rejects.toThrow("La quantité ne peut pas dépasser 3");
  });

  test("Scénario 4 : création échouée, quantité nulle ou négative", async () => {
    // Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 50€
    // Et qu'il n'y a aucune commande enregistrée
    const createOrderRepository = new CreateOrderDummyRepository();
    const createOrderUseCase = new CreateOrderUseCase(createOrderRepository);

    await expect(
      // Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 0
      createOrderUseCase.execute({
        productId: 1,
        quantity: 0,
      })
      // Alors une erreur doit être envoyée "La quantité doit être supérieure à 0"
    ).rejects.toThrow("La quantité doit être supérieure à 0");
  });

  test("Scénario 5 : création échouée, produit inexistant", async () => {
    // Étant donné qu'aucun produit n'existe avec l'identifiant 999
    // Et qu'il n'y a aucune commande enregistrée
    const createOrderRepository = new CreateOrderDummyRepository();
    const createOrderUseCase = new CreateOrderUseCase(createOrderRepository);

    await expect(
      // Quand je crée une commande avec le produit d'identifiant 999 et une quantité de 2
      createOrderUseCase.execute({
        productId: 999,
        quantity: 2,
      })
      // Alors une erreur doit être envoyée "Le produit n'existe pas"
    ).rejects.toThrow("Le produit n'existe pas");
  });
});
