import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const DELETE = async (req, { params }) => {
  const { professionalDetail, recordId } = params;
  const { userId } = await req.json();
  try {
    await connectToDb();
    const user = await User.findById(userId);
    if (!user) return new Response("No User found", { status: 404 });
    const detailTypes = {
      skills: "skills",
      education: "education",
      experiences: "experiences",
      certification: "certification",
    };
    const detailType = detailTypes[professionalDetail];
    if (!detailType)return new Response("Invalid Detail Type", { status: 400 });
    const detailArray = user.professionalDetails[detailType];
    const recordIndex = detailArray.findIndex(
      (record) => record.id === recordId
    );
    if (recordIndex === -1) {
      return new Response("Record not found",{status:404});
    }
    detailArray.splice(recordIndex, 1);

    await user.save();
    return new Response("Record deleted successfully",{status:201})
  } catch (error) {
    return new Response(error,{status:501})
  }
};
