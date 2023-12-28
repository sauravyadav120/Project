import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const POST = async (req, { params }) => {
  const { toConnectId } = params;
  const { userId } = await req.json();

  try {
    await connectToDb();

    if (userId === toConnectId) {
      return new Response("Cannot add yourself");
    }

    const personExists = await User.findById(userId);

    if (!personExists) {
      return new Resposne("Connection Not found", { status: "404" });
    }

    const isPersonAlreadyConnected =
      personExists.connections.includes(toConnectId);

    if (isPersonAlreadyConnected) {
      return new Response("Cannot add already added connection", {
        status: "403",
      });
    }

    const currentUser = await User.findById(userId);

    currentUser.connections.push(toConnectId);

    await currentUser.save();

    return new Response("Successfully made a connection", { status: "201" });
  } catch (error) {
    return new Response(error, { status: "501" });
  }
};
