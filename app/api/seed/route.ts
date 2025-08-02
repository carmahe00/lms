// app/api/seed/route.ts
import { NextResponse } from 'next/server';
import Category from '@/models/category';
import SubCategory from '@/models/subCategory';
import Item from '@/models/catewithSubcate';
import dbConnect from '@/utils/dbConnect';

export async function GET() {
  try {
    dbConnect();

    await Category.deleteMany();
    await SubCategory.deleteMany();
    await Item.deleteMany();

    const categories = await Category.insertMany([
      { name: 'Technology', slug: 'technology' },
      { name: 'Books', slug: 'books' },
    ]);

    const subcategories = await SubCategory.insertMany([
      { name: 'Mobile Phones', slug: 'mobile-phones' },
      { name: 'Sci-Fi', slug: 'sci-fi' },
    ]);

    await Item.insertMany([
      {
        categoryId: categories[0]._id,
        subcategoryId: subcategories[0]._id,
        title: 'iPhone 14',
        subtitle: 'Latest Apple phone',
        slug: 'iphone-14',
      },
    ]);

    return NextResponse.json({ message: '✅ Seeded successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '❌ Seeding failed' }, { status: 500 });
  }
}
