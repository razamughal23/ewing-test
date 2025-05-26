"use client";
import { create } from "zustand";
import { useEffect } from "react";

interface ApiDataState {
  data: any;
  loading: boolean;
  FakeApiData: () => Promise<void>;
}
export const useFakeApiData = create<ApiDataState>((set) => ({
  data: null,
  loading: false,
  FakeApiData: async () => {
    set({ loading: true });
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      set({ data });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
export const useFetchFakeApiData = () => {
  const { FakeApiData, data, loading } = useFakeApiData();
  useEffect(() => {
    FakeApiData();
  }, [FakeApiData]);

  return { data, loading };
};
