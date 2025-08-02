import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '@/slice/categorySlice';
import subcategoryReducer from "@/slice/subcategorySlice";
import itemsReducer from "@/slice/catewithsubcateSlice";
export const store = configureStore({
    reducer:{
        categories: categoryReducer,
        subcategories:subcategoryReducer,
        items: itemsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;