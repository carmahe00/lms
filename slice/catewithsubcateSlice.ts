import { RootState } from '@/app/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
import { Category } from './categorySlice';

export interface UpdateSubCategoryPayload {
  _id: string;
  id: string;
  name: string;
}

interface CreateSubCategory {
    categoryId: string | undefined;
    subcategoryId: string | undefined;
    title: string;
    subtitle: string;
}

export interface SubCategory {
  _id: string;
  id: string;
  name: string;
}
interface CateWithSubCat { id?:string, _id:string, categoryId: Category; subcategoryId: SubCategory; title: string; subtitle: string; }
interface ItemState {
  items: CateWithSubCat[];
  loading: boolean;
  error: string | null;
  editingItem: CateWithSubCat | null;
}

export const fetchItems = createAsyncThunk(
  "items/fetchItems",

  async () => {
    const response = await fetch(`${process.env.API}/admin/catewithsubcate`);
    return await response.json();
  }
);

export const addSubCategory = createAsyncThunk(
  "subcategories/addSubCategory",

  async (newSubCategory) => {
    const response = await fetch(`${process.env.API}/admin/subcategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newSubCategory }),
    });
    toast.success("subcategory created successfully")
    const data = await response.json();
    return data;
  }
);

export const deleteItem = createAsyncThunk<string, string>("items/deleteItem", async (id) => {
  const response = await fetch(
    `${process.env.API}/admin/catewithsubcate/${id}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    toast.success("deleted successfully");
  } else {
    toast.error("deleted failed");
  }
  return id;
});

export const saveItem = createAsyncThunk<CreateSubCategory, CreateSubCategory>(
  "items/saveItem",

  async (item, { getState }) => {
    const state = getState() as RootState;
    const { editingItem } = state.items;

    if (editingItem) {
      const response = await fetch(
        `${process.env.API}/admin/catewithsubcate/${editingItem._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(item),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("updated successfully");
      } else {
        toast.error(data?.err);
      }
    } else {
      const response = await fetch(`${process.env.API}/admin/catewithsubcate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(item),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("item added successfully");
      } else {
        toast.error(data?.err);
      }
    }
    return item;
  }
);

export const updateSubCategory = createAsyncThunk<SubCategory, UpdateSubCategoryPayload>(
  "subcategories/updateSubCategory",

  async ({ id, name }) => {
    const response = await fetch(`${process.env.API}/admin/subcategory/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, name }),
    });

    const data = await response.json();
    toast.success("subcategory updated successfully")
    return data;
  }
);
const initialState: ItemState = {
  items: [],
  loading: false,
  error: null,
  editingItem: null,
}
const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setEditingItem: (state, action) => {
      state.editingItem = action.payload;
    },
    resetEditingItem: (state) => {
      state.editingItem = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(saveItem.fulfilled, (state, action) => {
        state.editingItem = null;
      })

      .addCase(fetchItems.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items &&  state.items.filter((item) => item.id !== action.payload);
      });
  },
})
export const { setEditingItem, resetEditingItem } = itemsSlice.actions;

export default itemsSlice.reducer;