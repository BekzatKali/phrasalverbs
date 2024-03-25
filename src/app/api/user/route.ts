import { NextRequest, NextResponse } from "next/server";
import connectMongoDB from "@/libs/db";
import User from "@/models/user";

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;

    const email = searchParams.get('email');

    if (!email) {
        return NextResponse.json({ message: "Email parameter is missing" }, { status: 400 });
    }

    await connectMongoDB();

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error retrieving user:", error);
        return NextResponse.json({ message: "Error retrieving user" }, { status: 500 });
    }
}