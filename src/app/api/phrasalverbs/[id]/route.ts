import connectMongoDB from "@/libs/db";
import PhrasalVerb from "@/models/model";
import { NextResponse, NextRequest } from "next/server";

interface Params {
    id: string;
}

export async function PUT(request: NextRequest, {params}: {params: Params}) {
    const { id } = params;
    const { newVerb: verb, newExample: example } = await request.json();
    await connectMongoDB();
    await PhrasalVerb.findByIdAndUpdate(id, {verb, example});
    return NextResponse.json({message: "Phrasal Verb Updated"}, {status: 201})
}

export async function GET(request: NextRequest, {params}: {params: Params}) {
    const { id } = params;
    await connectMongoDB();
    const phrasalVerb = await PhrasalVerb.findOne({_id: id});
    return NextResponse.json({ phrasalVerb }, {status: 200})
}
