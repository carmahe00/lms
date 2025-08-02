import mongoose from 'mongoose';

const SubCategory = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trip: true
    },
    slug: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


export default mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategory);