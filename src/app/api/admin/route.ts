import connectMongoDB from "@/libs/db";
import PhrasalVerb from "@/models/phrasalVerb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get('id');
    await connectMongoDB();

    try {
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        
        await PhrasalVerb.deleteMany({ userId: id });

        return NextResponse.json({ message: 'User and associated phrasal verbs deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'An error occurred while deleting user' }, { status: 500 });
    }
}