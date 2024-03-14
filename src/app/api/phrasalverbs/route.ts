import connectMongoDB from "@/libs/db";
import PhrasalVerb from "@/models/model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { verb, example } = await request.json();
        await connectMongoDB();
        await PhrasalVerb.create({ verb, example });
        return NextResponse.json({ message: "Phrasal Verb Created" }, { status: 201 });
    } catch (error) {
        console.error("Error creating phrasal verb:", error);
        return NextResponse.json({ message: "Error creating phrasal verb" }, { status: 500 });
    }
}

export async function GET() {
    await connectMongoDB();
    const phrasalVerbs = await PhrasalVerb.find();
    return NextResponse.json({ phrasalVerbs });
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await PhrasalVerb.findByIdAndDelete(id);
    return NextResponse.json({ message: "Phrasal Verb Deleted" }, { status: 200 });
}

