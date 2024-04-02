import connectMongoDB from "@/libs/db";
import PhrasalVerb from "@/models/phrasalVerb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

interface Params {
  id: string;
}

export async function PUT(request: NextRequest, {params}: {params: Params}) {
    const { id } = params;
    const { newVerb: verb, newExample: example } = await request.json();
    await connectMongoDB();
    const user = await User.findOne({ "phrasalVerbs._id": id });
    if (!user) {
      return NextResponse.json({ message: "Phrasal Verb not found" }, { status: 404 });
    }
    const phrasalVerbIndex = user.phrasalVerbs.findIndex((phrasalVerb: any) => phrasalVerb._id.toString() === id);
    if (phrasalVerbIndex !== -1) {
      user.phrasalVerbs[phrasalVerbIndex].verb = verb;
      user.phrasalVerbs[phrasalVerbIndex].example = example;
      await user.save();
      return NextResponse.json({ message: "Phrasal Verb Updated" }, { status: 201 });
    } else {
      return NextResponse.json({ message: "Phrasal Verb not found" }, { status: 404 });
    }
}

export async function GET({params}: {params: Params}) {
    const { id } = params; 
    await connectMongoDB();
    const phrasalVerb = await PhrasalVerb.findOne({_id: id});
    return NextResponse.json({ phrasalVerb }, {status: 200})
}
