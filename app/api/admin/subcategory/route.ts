import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";



import slugify from "slugify";
import SubCategory from "@/models/subCategory";

export async function GET() {
    await dbConnect();

    try {
        const subcategory = await SubCategory.find({}).sort({ createdAt: -1 });

        return NextResponse.json(subcategory);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();

    const body = await req.json();

    const { name } = body;



    try {
        const subcategory = await SubCategory.create({ name, slug: slugify(name) });

        console.log("subcategory", subcategory)


        return NextResponse.json(subcategory);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}