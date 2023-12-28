import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const GET = async (req,{params}) => {
  const {id} = params
  try {
    await connectToDb();

    const user = await User.findById(id).populate("connections");

    if (!user) {
      return new Response("User not found", { status: "404" });
    }
    return new Response(JSON.stringify(user), { status: "200" });
  } catch (error) {
    return new Response(error, { status: "500" });
  }
};
