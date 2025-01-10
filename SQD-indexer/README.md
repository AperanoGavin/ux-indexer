# **TD2-Crypto Indexeur Blockchain**

## **Pré-requis**
Avant de commencer, assure-toi d'avoir les outils suivants installés sur ta machine :

1. [Node.js (version 20.x ou supérieure)](https://nodejs.org/)
2. [Docker Desktop](https://www.docker.com/products/docker-desktop/)
3. [Git](https://git-scm.com/)
4. Un IDE comme [WebStorm](https://www.jetbrains.com/webstorm/) ou [Visual Studio Code](https://code.visualstudio.com/).

---

## **Installation et Configuration**

### **1. Clone le dépôt**
```bash
git clone <https://github.com/AperanoGavin/ux-indexer>
cd td2-crypto
```

### **2. Installe les dépendances**
```bash
npm install
```

### **3. Configure PostgreSQL avec Docker**
Lance PostgreSQL en utilisant `docker-compose.yaml` :
```bash
docker compose up -d
```

Cela démarre un conteneur PostgreSQL avec les paramètres suivants (fournis dans `.env`) :
- **Nom de la base** : `squid`
- **Port** : `23798`

### **4. Configure le schéma GraphQL**
Le fichier `schema.graphql` définit les données à indexer, par exemple :
```graphql
type Transfer @entity {
  id: ID!
  from: String! @index
  to: String! @index
  value: BigInt!
}
```

### **5. Gère les modèles TypeORM**
Génère automatiquement les modèles TypeORM basés sur le fichier `schema.graphql` :
```bash
npx squid-typeorm-codegen
```

### **6. Compile le projet TypeScript**
Compile tout le projet :
```bash
npx tsc
```

### **7. Gère et applique les migrations**
1. Génère les migrations nécessaires :
   ```bash
   npx squid-typeorm-migration generate
   ```
2. Applique les migrations à la base de données :
   ```bash
   npx squid-typeorm-migration apply
   ```

### **8. Lance l'indexeur**
Une fois toutes les étapes précédentes complétées, lance l'indexeur pour commencer à écouter et indexer les événements blockchain :
```bash
node lib/main.js
```

---

## **Structure du projet**

```plaintext
td2-crypto/
├── lib/                          # Fichiers compilés TypeScript (générés)
├── node_modules/                 # Dépendances du projet
├── src/                          # Code source
│   ├── model/                    # Modèles TypeORM générés
│   ├── schema.graphql            # Schéma GraphQL
│   ├── main.ts                   # Fichier principal de l'indexeur
├── .env                          # Variables d'environnement pour PostgreSQL
├── docker-compose.yaml           # Configuration Docker pour PostgreSQL
├── package.json                  # Dépendances et scripts npm
├── tsconfig.json                 # Configuration TypeScript
```

---

## **Exemples de requêtes SQL**
Une fois les données indexées dans la base PostgreSQL, voici quelques exemples de requêtes SQL que tu peux exécuter :

1. **Lister tous les transferts d'une adresse spécifique :**
   ```sql
   SELECT * FROM transfer WHERE "from" = '0x123...';
   ```

2. **Obtenir la somme des transferts vers une adresse donnée :**
   ```sql
   SELECT SUM(value) FROM transfer WHERE "to" = '0x456...';
   ```

3. **Afficher les 10 derniers transferts :**
   ```sql
   SELECT * FROM transfer ORDER BY id DESC LIMIT 10;
   ```

---

## **Problèmes courants et solutions**

### **Erreur : `Failed to locate schema.graphql`**
- Assure-toi que le fichier `schema.graphql` est à la racine ou dans le dossier `src`.

### **Erreur : `Failed to resolve model`**
- Vérifie que les modèles sont générés dans `src/model/generated`.
- Compile à nouveau avec `npx tsc`.

### **Erreur de connexion à PostgreSQL**
- Vérifie que le conteneur PostgreSQL est bien démarré :
  ```bash
  docker ps
  ```
- Assure-toi que les variables dans `.env` correspondent à la configuration Docker.

---

## **Ressources**
- [Documentation Squid](https://docs.sqd.dev/sdk/how-to-start/squid-from-scratch/)
- [TypeORM Documentation](https://typeorm.io/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

---