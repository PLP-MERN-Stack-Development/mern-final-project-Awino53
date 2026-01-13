 import { create } from 'zustand';

const useProductStore = create((set) => ({
  // ✅ ALWAYS initialize as array
  products: [],

  // ✅ SINGLE fetchProducts (no duplicates)
  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();

      // 🔵 IMPORTANT: normalize response shape
      set({ products: Array.isArray(data.data) ? data.data : [] });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      set({ products: [] }); // ✅ prevent crash
    }
  },

  // ✅ CREATE
  createProduct: async (newProduct) => {
    if (
      !newProduct.name ||
      !newProduct.price ||
      !newProduct.imageUrl ||
      !newProduct.description
    ) {
      return { success: false, message: 'All fields are required.' };
    }

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();

    set((state) => ({
      products: [...state.products, data.data], // 🔵 consistent
    }));

    return { success: true, message: 'Product created successfully.' };
  },

  // ✅ UPDATE (MongoDB uses _id)
  updateProduct: async (id, updatedProduct) => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedProduct),
    });

    const data = await response.json();

    set((state) => ({
      products: state.products.map((product) =>
        product._id === id ? data.data : product
      ),
    }));
  },
}));

export default useProductStore;
