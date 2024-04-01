import connectMongoDB from "@/libs/db";
import PhrasalVerb from "@/models/phrasalVerb";
import User from "@/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
      const { verb, example, userEmail } = await request.json();
      await connectMongoDB();
      const user = await User.findOne({ email: userEmail });
  
      const newPhrasalVerb = await PhrasalVerb.create({
        verb,
        example,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
      });
  
      user.phrasalVerbs.push({
        phrasalVerbId: newPhrasalVerb._id,
        verb: newPhrasalVerb.verb,
        example: newPhrasalVerb.example,
      });
      
      await user.save();
  
      return NextResponse.json({ message: "Phrasal Verb Created" }, { status: 201 });
    } catch (error) {
      console.error("Error creating phrasal verb:", error);
      return NextResponse.json({ message: "Error creating phrasal verb" }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
  await connectMongoDB();

  const { searchParams } = new URL(request.url);

  const email = searchParams.get('email');
  
  const user = await User.findOne({ email: email }).populate('phrasalVerbs');

  if (user.isAdmin) {
    const users = await User.find({});
    return NextResponse.json({ users });
  }

  const phrasalVerbs = user?.phrasalVerbs || [];
  return NextResponse.json({ phrasalVerbs });
}


export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();

  try {
    const user = await User.findOne({ "phrasalVerbs._id": id });

    if (!user) {
      return NextResponse.json({ message: "Phrasal Verb not found" }, { status: 404 });
    }

    user.phrasalVerbs.pull({ _id: id });
    await user.save();

    return NextResponse.json({ message: "Phrasal Verb deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting phrasal verb:", error);
    return NextResponse.json({ message: "Error deleting phrasal verb" }, { status: 500 });
  }
}

