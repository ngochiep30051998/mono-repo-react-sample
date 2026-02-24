import { create } from 'zustand';
import type { MockProduct } from '@mocks';
import * as productService from '../services/product.service';
import type { ProductListParams } from '../services/product.service';

interface ProductState {
  data: MockProduct[];
  total: number;
  loading: boolean;
  detail: MockProduct | null;
  detailLoading: boolean;
  saving: boolean;
  fetchList: (params?: ProductListParams) => Promise<void>;
  fetchById: (id: string) => Promise<MockProduct | null>;
  create: (payload: Omit<MockProduct, 'id' | 'createdAt'>) => Promise<MockProduct>;
  update: (id: string, payload: Partial<MockProduct>) => Promise<MockProduct | null>;
  remove: (id: string) => Promise<boolean>;
  resetDetail: () => void;
}

const useProductStore = create<ProductState>()((set) => ({
  data: [],
  total: 0,
  loading: false,
  detail: null,
  detailLoading: false,
  saving: false,
  fetchList: async (params) => {
    set({ loading: true });
    try {
      const res = await productService.fetchProducts(params);
      set({ data: res.data, total: res.total });
    } finally {
      set({ loading: false });
    }
  },
  fetchById: async (id) => {
    set({ detailLoading: true });
    try {
      const product = await productService.fetchProductById(id);
      set({ detail: product });
      return product;
    } finally {
      set({ detailLoading: false });
    }
  },
  create: async (payload) => {
    set({ saving: true });
    try {
      return await productService.createProduct(payload);
    } finally {
      set({ saving: false });
    }
  },
  update: async (id, payload) => {
    set({ saving: true });
    try {
      return await productService.updateProduct(id, payload);
    } finally {
      set({ saving: false });
    }
  },
  remove: (id) => productService.deleteProduct(id),
  resetDetail: () => set({ detail: null }),
}));

export default useProductStore;
