import { connectToDb } from "@/lib/connect"
import User from "@/models/user"

export const POST=async(req,{params})=>{
    const {professionalDetail} = params
    const {userId,newDetail} = await req.json()
    try {
        await connectToDb()
        const user = await User.findById(userId)
        if(!user) return new Response("User not found",{status:404})
        const detailTypes = {
            skills: 'skills',
            education: 'education',
            experiences: 'experiences',
            certification: 'certification',
          };
      
          const detailType = detailTypes[professionalDetail];
          if (!detailType) {
            return res.status(400).json({ message: 'Invalid professionalDetail parameter' });
          }
      
          user.professionalDetails[detailType].push(newDetail);
      
          await user.save();
          return new Response("Professional Detail Added Successfully",{status:201})
    } catch (error) {
        return new Response(error,{status:501})   
    }
}