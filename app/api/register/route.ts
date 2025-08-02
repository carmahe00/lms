import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/user';
import dbConnect from '@/utils/dbConnect';
const { SERVER_SIDE } = process.env;

import axios from 'axios';

const verifyRecaptcha = async (recaptchaToken: string, retries = 3) => {
    for (let index = 0; index < retries; index++) {

        console.log({SERVER_SIDE, recaptchaToken});
        const { data } = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${SERVER_SIDE}&response=${recaptchaToken}`,
            {},
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8"
                },
            },
        );

        console.log("DATA GOOGLE", data);
        return data.success;
    }
}

export async function POST(request: NextRequest) {
    dbConnect();
    const { name, email, password, organization, recaptchaToken } = await request.json();
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser)
            return NextResponse.json({ err: "Email already exist" }, { status: 400 });
        const isHuman = await verifyRecaptcha(recaptchaToken);
        console.log("isHuman:",isHuman);
        if(!isHuman)
            return NextResponse.json({ err: "reCaptcha verification failed, please try again." }, { status: 400 });
        const user = await new User({
            name,
            email,
            password,
            organization
        }).save();
        return NextResponse.json({ msg: "User registered", user }, { status: 201 });
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ err: error.message }, { status: 500 });
    }
}

