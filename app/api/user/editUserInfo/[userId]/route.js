import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const PATCH = async (req, { params }) => {
  const { userId } = params;
  const body = await req.json();
  try {
    await connectToDb();
    const user = await User.findById(userId);
    if (!user) return new Response("User not found", { status: 404 });
    await User.findByIdAndUpdate(userId, {
      ...body,
    });
    return new Response("Successfully Updated", { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
