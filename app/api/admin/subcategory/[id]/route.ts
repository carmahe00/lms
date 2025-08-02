import { NextRequest, NextResponse, } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import SubCategory from '@/models/subCategory';
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
        const { ...updatedBody } = body;
        const updatingCategory = await SubCategory.findByIdAndUpdate(
            id,
            updatedBody,
            {
                new: true
            }
        );
        return NextResponse.json(updatingCategory);
    } catch (err: any) {
        console.log("error******", err);
        return NextResponse.json({
            err: err.message
        }, { status: 500 })
    }
}


export async function DELETE(req: NextRequest,
    {
        params,
    }: {
        params: Promise<{ id: string }>
    }) {
    await dbConnect();
    const { id } = await params;
    console.log(" context.params.id", id)

    try {
        const deletingSubCategory = await SubCategory.findByIdAndDelete({
            _id: id,
        });


        console.log("deletingSubCategory", deletingSubCategory)
        return NextResponse.json(deletingSubCategory);
    } catch (error: any) {
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}