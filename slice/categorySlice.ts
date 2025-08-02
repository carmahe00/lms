import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
export interface Category {
    id?: string;
    _id?: string;
    name: string;
}
interface UpdateCategoryPayload {
    id: string;
    name: string;
}
interface CategoryState {
    list: Category[];
    loading: boolean;
    error: string | null;
}

export const deleteCategory = createAsyncThunk<string, string>(
    "categories/deleteCategory",
    async ( id , { rejectWithValue }) => {
        try {
            console.log("id", id)

            const response = await fetch(`${process.env.API}/admin/category/${id}`, {
                method: "DELETE",

            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            return id;
        } catch (error: any) {
            console.error("Error DELETEING category:", error);
            return rejectWithValue(error.message);
        }
    }
)

export const updatedCategory = createAsyncThunk<Category, UpdateCategoryPayload>(
    "category/updatecategory",
    async ({ id, name }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${process.env.API}/admin/category/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, name }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error: any) {
            console.error("Error updating category:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const addCategory = createAsyncThunk<Category, string>(
    "categories/addCategories",
    async (newCategory) => {
        const response = await fetch(`${process.env.API}/admin/category`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: newCategory }),
        });
        return response.json(); // should return a Category object
    }
);

export const fetchCategories = createAsyncThunk("categories/fetchCategories", async () => {
    const response = await fetch(`${process.env.API}/admin/category`);
    return response.json();
})




const initialState: CategoryState = {
    list: [],
    loading: false,
    error: null,
};

const categorySlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error.message
            })
            .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.list.push(action.payload);
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.list = state.list.filter((cat) => cat._id !== action.payload)
            })
            .addCase(updatedCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.list.findIndex(
                    (cat) => cat._id === action.payload._id
                );

                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            });
    },
});


export default categorySlice.reducer;