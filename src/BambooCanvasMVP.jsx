import React, { useMemo, useState } from "react";

/* ================================
   Seed Data (Full Beverage List)
   ================================ */
const SEED_ITEMS = [
  /* ---------- Sake ---------- */
  { category: "Sake", name: "72 Clocks (1.8L)", par: 1 },
  { category: "Sake", name: "72 Clocks (750ml)", par: 3 },
  { category: "Sake", name: "Bride of the Fox (1.8L)", par: 2 },
  { category: "Sake", name: "Bride of the Fox (750ml)", par: 4 },
  { category: "Sake", name: "Cabin in the Snow (1.8L)", par: 2 },
  { category: "Sake", name: "Cabin in the Snow (750ml)", par: 4 },
  { category: "Sake", name: "Dry Mountain (1.8L)*", par: 2 },
  { category: "Sake", name: "Dry Mountain (750ml)*", par: 6 },
  { category: "Sake", name: "Old School Extra Dry (1.8L)", par: 1 },
  { category: "Sake", name: "Old School Extra Dry (750ml)", par: 4 },
  { category: "Sake", name: "Little Lilly (750ml)", par: 6 },
  { category: "Sake", name: "Hannya (750ml)*", par: 4 },
  { category: "Sake", name: "The 55 (750ml)", par: 5 },
  { category: "Sake", name: "Shogun (750ml)", par: 5 },
  { category: "Sake", name: "Hot Sake", par: 1.5 },

  /* ---------- Wine ---------- */
  { category: "Wine", subcategory: "Cava Brut", name: "Codorniu 'Ars Collecta'", par: 6 },
  { category: "Wine", subcategory: "Chardonnay", name: "Roco Gravel Road", par: 5 },
  { category: "Wine", subcategory: "Rosé Pinot Noir", name: "Sokol Blosser", par: 4 },
  { category: "Wine", subcategory: "Pinot Blanc", name: "Amity Vineyards", par: 6 },
  { category: "Wine", subcategory: "Pinot Gris", name: "King Estate", par: 5 },
  { category: "Wine", subcategory: "Pinot Gris", name: "Eola Hills", par: 6 },
  { category: "Wine", subcategory: "Pinot Noir", name: "Eola Hills", par: 6 },
  { category: "Wine", subcategory: "Pinot Noir", name: "Resonance", par: 6 },
  { category: "Wine", subcategory: "Red Blend", name: "Abbot's Table Red, Owen Roe", par: 6 },
  { category: "Wine", subcategory: "Malbec", name: "Bodega Norton", par: 5 },

  /* ---------- Spirits ---------- */
  { category: "Spirits", subcategory: "Vermouth", name: "Dolin Dry Vermouth", par: 3 },
  { category: "Spirits", subcategory: "Vermouth", name: "Cocchi Di Torino Sweet Vermouth", par: 2 },
  { category: "Spirits", subcategory: "Vermouth", name: "Cocchi Americano*", par: 3 },
  { category: "Spirits", subcategory: "Liqueur", name: "Aperol", par: 1 },
  { category: "Spirits", subcategory: "Liqueur", name: "Campari", par: 1 },
  { category: "Spirits", subcategory: "Liqueur", name: "Cointreau*", par: 3 },
  { category: "Spirits", subcategory: "Liqueur", name: "Grand Marnier", par: 1 },
  { category: "Spirits", subcategory: "Liqueur", name: "Macchu Pisco*", par: 3 },
  { category: "Spirits", subcategory: "Liqueur", name: "St. Elder", par: 1 },
  { category: "Spirits", subcategory: "Liqueur", name: "Giffard Péche de Vigne", par: 1 },
  { category: "Spirits", subcategory: "Liqueur", name: "Giffard Lichi-Li", par: 2 },
  { category: "Spirits", subcategory: "Cognac", name: "Hennessy VS", par: 1 },
  { category: "Spirits", subcategory: "Gin", name: "Sun Ranch*", par: 3 },
  { category: "Spirits", subcategory: "Gin", name: "Gray Whale", par: 1 },
  { category: "Spirits", subcategory: "Gin", name: "Hendrick's", par: 1 },
  { category: "Spirits", subcategory: "Gin", name: "Tanqueray", par: 1 },
  { category: "Spirits", subcategory: "Gin", name: "Roku Gin", par: 1 },
  { category: "Spirits", subcategory: "Gin", name: "Wildroots Cucumber/Grapefruit*", par: 3 },
  { category: "Spirits", subcategory: "Mezcal", name: "Banhez*", par: 3 },
  { category: "Spirits", subcategory: "Mezcal", name: "Del Maguey Vida", par: 2 },
  { category: "Spirits", subcategory: "Rum", name: "Bacardi Superior", par: 1 },
  { category: "Spirits", subcategory: "Rum", name: "Plantation 3 Star*", par: 4 },
  { category: "Spirits", subcategory: "Tequila", name: "Peublo Viejo Blanco*", par: 4 },
  { category: "Spirits", subcategory: "Tequila", name: "Peublo Viejo Reposado", par: 2 },
  { category: "Spirits", subcategory: "Tequila", name: "Siete Leguas Blanco", par: 1 },
  { category: "Spirits", subcategory: "Tequila", name: "Siete Leguas Reposado", par: 1 },
  { category: "Spirits", subcategory: "Tequila", name: "Don Julio Blanco", par: 1 },
  { category: "Spirits", subcategory: "Tequila", name: "Don Julio Reposado", par: 1 },
  { category: "Spirits", subcategory: "Tequila", name: "Don Julio Anejo", par: 1 },
  { category: "Spirits", subcategory: "Vodka", name: "Grey Goose", par: 1 },
  { category: "Spirits", subcategory: "Vodka", name: "Kettle One", par: 1 },
  { category: "Spirits", subcategory: "Vodka", name: "Monopolowa*", par: 4 },
  { category: "Spirits", subcategory: "Vodka", name: "Tito's", par: 2 },
  { category: "Spirits", subcategory: "Vodka", name: "Haku Vodka", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Four Roses*", par: 4 },
  { category: "Spirits", subcategory: "Whiskey", name: "George Dickel Rye*", par: 2 },
  { category: "Spirits", subcategory: "Whiskey", name: "Rittenhouse Rye", par: 2 },
  { category: "Spirits", subcategory: "Whiskey", name: "Knob Creek Bourbon", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Knob Creek Rye", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Whistlepig", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Jameson", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Johnnie Walker Black", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Famous Grouse*", par: 3 },
  { category: "Spirits", subcategory: "Whiskey", name: "Macallan 12yr", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Fukano", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Suntory Toki Whisky*", par: 4 },
  { category: "Spirits", subcategory: "Whiskey", name: "Hatozaki Finest Whisky", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Hibiki Harmony Whisky", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Nikka Coffee Grain Whisky", par: 1 },
  { category: "Spirits", subcategory: "Whiskey", name: "Yamazaki 12yr Whisky", par: 1 },
];

/* Helper: Generate unique keys */
const rowKey = (it, idx) =>
  `${it.category}__${it.name}__${it.subcategory ?? ""}__${idx}`;

/* ================================
   Main Component
   ================================ */
export default function BambooCanvasMVP() {
  const [tab, setTab] = useState("catalog");
  const [onHand, setOnHand] = useState({});
  const [cart, setCart] = useState([]);

  const deficits = useMemo(() => {
    return SEED_ITEMS.map((item) => {
      const qty = parseFloat(onHand[item.name]) || 0;
      const diff = item.par - qty;
      return { ...item, qty, deficit: diff > 0 ? diff : 0 };
    });
  }, [onHand]);

  const lowItems = deficits.filter((i) => i.deficit > 0);

  const handleAddToCart = (item) => {
    setCart((prev) => {
      if (prev.find((x) => x.name === item.name)) return prev;
      return [...prev, { ...item, qty: item.deficit }];
    });
  };

  const emailText = useMemo(
    () =>
      cart
        .map(
          (l) =>
            `${l.name}${l.subcategory ? ` (${l.subcategory})` : ""} — ${l.qty}`
        )
        .join("\n"),
    [cart]
  );

  /* ---------- Pages ---------- */
  const Catalog = () => (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-2 text-center">🍶 Beverage Catalog</h1>
      {SEED_ITEMS.map((item, idx) => (
        <div
          key={rowKey(item, idx)}
          className="border rounded-xl p-3 shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between"
        >
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-500">
              {item.category} {item.subcategory && `• ${item.subcategory}`}
            </div>
          </div>
          <div className="text-gray-600 mt-2 sm:mt-0">Par: {item.par}</div>
        </div>
      ))}
    </div>
  );

  const Count = () => (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-2 text-center">📊 Count On-Hand</h1>
      {SEED_ITEMS.map((item, idx) => (
        <div
          key={rowKey(item, idx)}
          className="border rounded-xl p-3 shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between"
        >
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-500">
              Par: {item.par} {item.subcategory && `• ${item.subcategory}`}
            </div>
          </div>
          <input
            type="number"
            step="0.5"
            value={onHand[item.name] ?? ""}
            onChange={(e) =>
              setOnHand((p) => ({ ...p, [item.name]: e.target.value }))
            }
            className="border rounded-md p-1 w-20 text-right"
            placeholder="0"
          />
        </div>
      ))}
      <button
        onClick={() => setTab("summary")}
        className="bg-black text-white rounded-lg w-full py-3 font-semibold mt-4"
      >
        Next → Summary
      </button>
    </div>
  );

  const Summary = () => (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-2 text-center">📦 Restock Summary</h1>
      {lowItems.map((item, idx) => (
        <div
          key={rowKey(item, idx)}
          className="border rounded-xl p-3 shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between"
        >
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-500">
              Need {item.deficit} more to meet par
            </div>
          </div>
          <button
            onClick={() => handleAddToCart(item)}
            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      ))}
      <button
        onClick={() => setTab("cart")}
        className="bg-black text-white rounded-lg w-full py-3 font-semibold mt-4"
      >
        View Cart ({cart.length})
      </button>
    </div>
  );

  const Cart = () => (
    <div className="p-4 space-y-4 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-2 text-center">🛒 Order Cart</h1>
      {cart.length === 0 && <p>No items added yet.</p>}
      {cart.map((item, idx) => (
        <div
          key={rowKey(item, idx)}
          className="border rounded-xl p-3 shadow-sm bg-white flex flex-col sm:flex-row sm:justify-between"
        >
          <div>
            <div className="font-semibold">{item.name}</div>
            <div className="text-sm text-gray-500">
              Qty: {item.qty} {item.subcategory && `• ${item.subcategory}`}
            </div>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <textarea
          readOnly
          className="w-full border rounded-md p-2 text-sm h-40"
          value={emailText}
        />
      )}

      <button
        onClick={() => navigator.clipboard.writeText(emailText)}
        className="bg-green-600 text-white rounded-lg w-full py-3 font-semibold mt-4"
      >
        Copy Order Text
      </button>

      <button
        onClick={() => {
          setTab("catalog");
          setCart([]);
          setOnHand({});
        }}
        className="text-gray-600 underline w-full py-3 font-semibold"
      >
        Start Over
      </button>
    </div>
  );

  /* ---------- Page Switcher ---------- */
  const renderPage = () => {
    switch (tab) {
      case "catalog":
        return <Catalog />;
      case "count":
        return <Count />;
      case "summary":
        return <Summary />;
      case "cart":
        return <Cart />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <nav className="bg-white shadow-md py-3 px-4 flex justify-center gap-4 text-sm font-semibold sticky top-0 z-10">
        <button
          onClick={() => setTab("catalog")}
          className={tab === "catalog" ? "text-blue-600" : "text-gray-600"}
        >
          Catalog
        </button>
        <button
          onClick={() => setTab("count")}
          className={tab === "count" ? "text-blue-600" : "text-gray-600"}
        >
          Count
        </button>
        <button
          onClick={() => setTab("summary")}
          className={tab === "summary" ? "text-blue-600" : "text-gray-600"}
        >
          Summary
        </button>
        <button
          onClick={() => setTab("cart")}
          className={tab === "cart" ? "text-blue-600" : "text-gray-600"}
        >
          Cart
        </button>
      </nav>

      <main className="flex-1">{renderPage()}</main>

      <footer className="text-center text-gray-400 text-xs py-4">
        Bamboo Canvas © 2025
      </footer>
    </div>
  );
}
