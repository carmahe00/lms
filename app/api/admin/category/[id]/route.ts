import { NextRequest, NextResponse, } from 'next/server';
import dbConnect from '@/utils/dbConnect';
import Category from '@/models/category';

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
        const { _id, ...updatedBody } = body;
        const updatingCategory = await Category.findByIdAndUpdate(
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
    console.log("context.params.id", id)
    try {
        const deletingCategory = await Category.findByIdAndDelete(
            {
                _id: id
            }
        );

        return NextResponse.json(deletingCategory);
    } catch (error:any) {

        console.log("error******", error);
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}