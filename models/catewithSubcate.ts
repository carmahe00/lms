import mongoose from "mongoose";


const CateWithSubCateSchema = new mongoose.Schema(
    {
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        subcategoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true,
        },

        title: {
            type: String,
        },

        subtitle: {
            type: String,
        },

        slug: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Item ||
    mongoose.model("Item", CateWithSubCateSchema);