import { NextRequest, NextResponse } from "next/server";

import dbConnect from "@/utils/dbConnect";
import CatewithSubcate from "@/models/catewithSubcate";

export async function PUT(req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }) {
    await dbConnect();
    const body = await req.json();
    const { id } = await params;
    try {
        const updatingCategory = await CatewithSubcate.findByIdAndUpdate(
            id,
            body,
            { new: true }
        );

        return NextResponse.json(updatingCategory);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }
) {
    await dbConnect();
    const { id } = await params;
    try {
        const deletingCategory = await CatewithSubcate.findByIdAndDelete({
            _id: id,
        });

        return NextResponse.json(deletingCategory);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}