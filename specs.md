## PRODUIT

### US-1: Créer un produit

En tant qu’utilisateur,  
Je veux pouvoir créer un produit,  
Afin de le mettre en vente

Règles métier :

- titre > 2
- Prix > 0
- Prix < 10 000
- min Description > 5

  - Exemple 1/ Scénario 1 : création réussie

    - Étant donné qu'il n'y a pas de produit enregistré
    - Quand je créé un produit avec en titre «switch 2», description «nouvelle console» et un prix à 500
    - Alors le produit doit être créé

  - Exemple 2/ Scénario 2 : création échouée, titre trop court

    - Étant donné qu'il n'y a pas de produit enregistré
    - Quand je créé un produit avec en titre «sw»
    - Alors une erreur doit être envoyée "titre trop court»

  - Exemple 3/ Scénario 3 : création échouée, prix négatif

    - Étant donné qu'il n'y a pas de produit enregistré
    - Quand je créé un produit avec en prix -10
    - Alors une erreur doit être envoyée «le prix doit être supérieur à 0»

  - Exemple 4/ Scénario 4 : création échouée, prix supérieur à 10000

    - Étant donné qu'il n'y a pas de produit enregistré
    - Quand je créé un produit avec en prix 11000
    - Alors une erreur doit être envoyée «le prix doit être inférieur à 11000»

  - Exemple 5/ Scénario 5 : description trop courte
    - Étant donné qu'il n'y a pas de produit
    - Quand je créé un produit avec une description "test"
    - Alors une erreur "Description trop courte" doit être renvoyé

### US-2: Modifier un produit

En tant qu’utilisateur
Je veux pouvoir modifier un produit,  
Afin de mettre à jour ses infos pour la vente

Règles métier :

- titre > 2
- Prix > 0
- Prix < 10 000

  - Exemple 1/ Scénario 1 :

    - Étant donné je suis identifié en tant qu’utilisateur
    - Et qu’un produit existe avec l’identifiant 2
    - Quand je modifie le produit avec l’identifiant 2, avec en titre "switch 3», description «nouvelle nouvelle console» et un prix à 5000e
    - Alors le produit doit être modifié

  - Exemple 2/ Scénario 2 :

    - Étant donné je suis identifié en tant qu’utilisateur
    - Et qu’un produit existe avec l’identifiant 2
    - Quand je modifie le produit avec l’identifiant 2 avec en titre "sw»
    - Alors une erreur doit être envoyée «titre trop courr»

  - Exemple 3/ Scénario 3 :

    - Étant donné je suis identifié en tant qu’utilisateur
    - Et qu’un produit existe avec l’identifiant 2
    - Quand je modifie le produit avec l’identifiant 2 avec en prix -10
    - Alors une erreur doit être envoyée "le prix doit être supérieur à 0»

  - Exemple 4/ Scénario 4 :
    - Étant donné je suis identifié en tant qu’utilisateur
    - Et qu’un produit existe avec l’identifiant 2
    - Quand je modifie le produit avec l’identifiant 2 avec en prix 11000
    - Alors une erreur doit être envoyée « le prix doit être inférieur à 11000 »

## Order

### US-3: Créer une commande avec des produits

En tant qu'utilisateur,
Je veux créer une commande avec un produit et une quantité,
Afin de recevoir la commande.

Règles métiers :

- Prix par commande < 200€
- Quantité de produit < 4
- Quantité de produit > 0
- Création d'une nouvelle commande supprime l'ancienne
- Si le prix d'un produit est modifié, ça ne change rien à la commande
- Vérifier que l'id n'existe pas déjà
- Date de création = celle d'aujourd'hui
- Une commande contient un id, une date de création, le produit, sa quantité et le prix total

  - Exemple 1/ Scénario 1 : création réussie d'une commande

    - Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 50€
    - Et qu'il n'y a aucune commande enregistrée
    - Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 2
    - Alors la commande doit être créée avec succès
    - Et le prix total doit être de 100€
    - Et la date de création doit être celle d'aujourd'hui

  - Exemple 2/ Scénario 2 : création échouée, prix total dépasse 200€

    - Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 120€
    - Et qu'il n'y a aucune commande enregistrée
    - Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 3
    - Alors une erreur doit être envoyée "Le prix total de la commande ne peut pas dépasser 200€"

  - Exemple 3/ Scénario 3 : création échouée, quantité supérieure ou égale à 4

    - Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 30€
    - Et qu'il n'y a aucune commande enregistrée
    - Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 5
    - Alors une erreur doit être envoyée "La quantité ne peut pas dépasser 3"

  - Exemple 4/ Scénario 4 : création échouée, quantité nulle ou négative

    - Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 50€
    - Et qu'il n'y a aucune commande enregistrée
    - Quand je crée une commande avec le produit d'identifiant 1 et une quantité de 0
    - Alors une erreur doit être envoyée "La quantité doit être supérieure à 0"

  - Exemple 5/ Scénario 5 : création échouée, produit inexistant

    - Étant donné qu'aucun produit n'existe avec l'identifiant 999
    - Et qu'il n'y a aucune commande enregistrée
    - Quand je crée une commande avec le produit d'identifiant 999 et une quantité de 2
    - Alors une erreur doit être envoyée "Le produit n'existe pas"

  - Exemple 6/ Scénario 6 : remplacement d'une commande existante

    - Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 30€
    - Et qu'un produit existe avec l'identifiant 2, titre "PS5", description "console Sony" et prix 40€
    - Et qu'une commande existe déjà avec le produit 1, quantité 2 et prix total 60€
    - Quand je crée une nouvelle commande avec le produit d'identifiant 2 et une quantité de 3
    - Alors l'ancienne commande doit être supprimée
    - Et la nouvelle commande doit être créée avec le produit 2, quantité 3 et prix total 120€

  - Exemple 7/ Scénario 7 : modification du prix du produit n'affecte pas la commande

    - Étant donné qu'un produit existe avec l'identifiant 1, titre "Switch 2", description "nouvelle console" et prix 50€
    - Et qu'une commande existe avec le produit 1, quantité 2 et prix total 100€
    - Quand je modifie le prix du produit 1 à 70€
    - Alors le prix total de la commande doit rester à 100€
    - Et le produit dans la base de données doit avoir un prix de 70€
