
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";


import slugify from "slugify";
import CateWithSubCate from "@/models/catewithSubcate";
import SubCategory from "@/models/subCategory";

export async function GET() {
    await dbConnect();
    try {
        const catewithsubcate = await CateWithSubCate.find({})
            .sort({ createdAt: -1 })
            .populate("categoryId")
            .populate("subcategoryId");

        return NextResponse.json(catewithsubcate);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();
    const { categoryId, subcategoryId, title, subtitle } = body;

    console.log({ categoryId, subcategoryId, title, subtitle });

    const subcategory = await SubCategory.findOne({ _id: subcategoryId });

    const subcategorytitle = subcategory?.name;

    try {
        const catewithsubcate = await CateWithSubCate.create({
            categoryId,
            subcategoryId,
            title,
            subtitle,
            slug: slugify(title) || slugify(subcategorytitle),
        });

        console.log("   save  data  successfully", catewithsubcate);

        return NextResponse.json(catewithsubcate);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}