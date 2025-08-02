import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { toast } from "react-toastify";
export interface UpdateSubCategoryPayload {
    _id: string;
    id: string;
    name: string;
}

export interface SubCategory {
    _id: string;
    id: string;
    name: string;
}
interface SubCategoryState {
    list: SubCategory[];
    loading: boolean;
    error: string | null;
}
export const addSubCategory = createAsyncThunk<SubCategory, string>(
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


export const fetchSubCategories = createAsyncThunk(
    "subcategories/fetchSubcategories",
    async () => {
        const response = await fetch(`${process.env.API}/admin/subcategory`);

        const data = await response.json();

        return data;
    }
);


export const deleteSubCategory = createAsyncThunk<string, string>(
    "subcategories/deletesubcategories",
    async (id) => {
        await fetch(`${process.env.API}/admin/subcategory/${id}`, {
            method: "DELETE",
        });
        toast.success("subcategory deleted successfully")
        return id
    }
);
const initialState: SubCategoryState = {
    list: [],
    loading: false,
    error: null,
};
const subCategorySlice = createSlice({
    name: "subcategory",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchSubCategories.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchSubCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchSubCategories.rejected, (state, action: any) => {
                state.loading = false;
                console.log("action:", action);
                state.error = action.error.message;
            })
            .addCase(addSubCategory.fulfilled, (state, action: PayloadAction<UpdateSubCategoryPayload>) => {
                state.list.push(action.payload);
            })
            .addCase(updateSubCategory.fulfilled, (state, action) => {
                const index = state.list.findIndex(
                    (sub) => sub._id === action.payload._id
                );

                if (index !== -1) {
                    state.list[index] = action.payload;
                }
            })
            .addCase(deleteSubCategory.fulfilled, (state, action) => {
                state.list = state.list.filter((sub) => sub._id !== action.payload)
            })
    },
});


export default subCategorySlice.reducer;

