import { useState } from "react";
import "./App.css";

// Commande Terminal d'activation : npm run dev -> http://localhost:5173/

// On commence ici par le composant le plus en bas de la hiérarchie des composants identifiés
// Pour chaque nouvelle catégorie rencontrée est créée une ligne, en l'occurrence il y aura une ligne "Fruits" et une ligne "Légumes"
/* Je récupère directement la prop "category" de l'objet "props" (passé par défaut en paramètre de tous les composants) en la passant en paramètre de la fonction

*/
function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th>{category}</th>
    </tr>
  );
}

// Pour chaque nouveau produit rencontré est créée une ligne composée d'un nom et d'un prix
/* Je récupère directement la prop "product" au singulier car une ligne produit traitera un seul produit à la fois

*/
function ProductRow({ product }) {
  const name = product.stocked ? (
    <span style={{ color: "green" }}>{product.name}</span>
  ) : (
    <span style={{ color: "red" }}>{product.name}</span>
  );

  return (
    <tr className="product">
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

// Prend en compte les mots de recherche avec ou sans accent
function normalizeText(text) {
  return text
    .normalize("NFD")                // Transforme les lettres accentuées en lettres + accents séparés
    .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
    .toLowerCase();                  // Passe en minuscules
}

// La table des produits parcourt le tableau produits et organise les éléments en lignes "ProductCategoryRow" et "ProductRow"
// Je récupère directement les props "products" au pluriel, "filterText" et "inStockOnly"
// Noter que "ProductTable" est le frère de "SearchBar" et autre enfant direct de "FilterableProductTable"
/* Son affichage, basé sur les éléments du tableau "products", varie en fonction de l'état de "filterText" et "inStockOnly"

  */
function ProductTable({ products, filterText, inStockOnly }) {
  const rows = [];
  let lastCategory = "";

  products.forEach((product) => {
    const normalizedFilter = normalizeText(filterText);
    if (
      !normalizeText(product.name).includes(normalizedFilter) &&
      !normalizeText(product.category).includes(normalizedFilter)
    ) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(<ProductRow product={product} key={product.name} />);

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

/* La barre de recherche est censée filtrer les textes passés en input en vérifiant les correspondances existantes, en prenant également en compte l'état de la checkbox (cochée ou non) et donc des stocks

  */
function SearchBar({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) {
  return (
    <form action="search" method="get">
      <div>
        <input type="search" placeholder="Recherche..." value={filterText} onChange={(e) => onFilterTextChange(e.target.value)} />
      </div>
      <div>
        <input
          type="checkbox"
          name="inStock"
          id="inStock"
          checked={inStockOnly}
          onChange={(e) => onInStockOnlyChange(e.target.checked)}
        />
        <label htmlFor="inStock">
          {" "}
          Afficher uniquement les produits disponibles
        </label>
      </div>
    </form>
  );
}

/* La table filtrable des produits représente le parent commun le plus proche des composants concernés par les états : filtre de texte et stockage (composant SearchBar)

*/
function FilterableProductTable({ products }) {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <>
      <SearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={setFilterText} onInStockOnlyChange={setInStockOnly} />
      <ProductTable
        products={products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </>
  );
}

// Déclaration du tableau "PRODUCTS" composé de 6 éléments (objets), composés eux-mêmes chacuns de 4 propriétés (catégorie, prix, état de stockage et nom), chacunes se voyant attribuer une valeur.
const PRODUCTS = [
  { category: "Fruits", price: "1 $", stocked: true, name: "Pomme" },
  { category: "Fruits", price: "1 $", stocked: true, name: "Fruit du Dragon" },
  {
    category: "Fruits",
    price: "2 $",
    stocked: false,
    name: "Fruit de la passion",
  },
  { category: "Légumes", price: "2 $", stocked: true, name: "Epinard" },
  { category: "Légumes", price: "4 $", stocked: false, name: "Citrouille" },
  { category: "Légumes", price: "1 $", stocked: true, name: "Petits pois" },
];

// On exporte le composant final contenant l'application entière constituée de chacuns de ses composants (comme en cascade)
// Cela permet de rendre le composant "App" exportable vers le fichier "main.jsx" puis vers "index.html"
export default function App() {
  return <FilterableProductTable products={PRODUCTS} />;
}
