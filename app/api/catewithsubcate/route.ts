import { NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";

import CateWithSubCate from "@/models/catewithSubcate";


export async function GET() {

    await dbConnect();
    try {
        const catewithsubCate = await CateWithSubCate.find({})
            .sort({ createdAt: -1 })
            .populate("categoryId")
            .populate("subcategoryId")

        return NextResponse.json(catewithsubCate)
    } catch (error:any) {
        return NextResponse.json({ err: error.message }, { status: 500 })
    }
}