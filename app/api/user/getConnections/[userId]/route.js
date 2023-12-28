import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const GET = async (req, { params }) => {
  const { userId } = params;
  try {
    await connectToDb();
    const currentUser = await User.findById(userId).populate("connections");
    if (!currentUser) return new Response("User not found", { status: 404 });
    const connections = currentUser.connections.map((con) => {
      const { name, email, _id, image,professionalDetails:{experiences} } = con;
      return { name, email, _id, image,experiences };
    });
    return new Response(JSON.stringify(connections), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 501 });
  }
};
