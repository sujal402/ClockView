interface CartItem {
  _id: string;
  name: string;
  code: string;
  cost: number;
  imageUrl?: { url: string }[];
}

interface CartProps {
  items?: CartItem[]; // optional, safer
}

export default function Cart({ items = [] }: CartProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage your cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg flex items-center gap-4 bg-white"
            >
              {/* Product Image */}
              <div className="w-24 h-24 flex-shrink-0 flex items-center justify-center overflow-hidden bg-gray-100 rounded">
                <img
                  src={item.imageUrl?.[0]?.url || "/watch1.jpg"}
                  alt={item.name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Code: {item.code}</p>
                <p className="text-lg font-bold text-amber-500">₹{item.cost}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
