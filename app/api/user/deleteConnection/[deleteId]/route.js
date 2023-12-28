import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const DELETE = async (req, { params }) => {
  const { deleteId } = params;
  const { userId } = await req.json();
  try {
    await connectToDb();
    if (userId === deleteId)
      return new Response("Cannot delete yourself", { status: 403 });
    const currentUser = await User.findById(userId);
    const deleteConnectionUser = await User.findById(deleteId);
    if (!currentUser)
      return new Response("Current User not found", { status: 404 });
    if (!deleteConnectionUser)
      return new Response("User doesn't exist", { status: 404 });
    if (!currentUser.connections.includes(deleteId))
      return new Response("Id is already deleted from connections", {
        status: 403,
      });
    currentUser.connections.pull(deleteId);
    await currentUser.save();
    return new Response("Connection successfully Deleted", { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};
