import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const POST = async (req) => {
  try {
    const { userId } = await req.json();
    await connectToDb();
    
    const currentUser = await User.findById(userId);
    const users = await User.find();
    const { connections } = currentUser;
    const connectionIds = connections.map(con => con.toString());
    
    const reqUsersArray = users.filter(item => (
      !connectionIds.includes(item._id.toString()) && item._id.toString() !== userId
    ));

    const useFullArray = reqUsersArray.map((item)=>{
      const {name,_id,professionalDetails:{experiences},image} = item
      return{
        name,
        _id,
        experiences,
        image
      }
    })
    
    return new Response(JSON.stringify(useFullArray), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 501, headers: { 'Content-Type': 'application/json' } });
  }
};
