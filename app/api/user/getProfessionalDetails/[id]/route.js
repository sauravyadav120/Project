import User from "@/models/user"; // Assuming this is the correct path

export const GET = async (request, { params }) => {
  const { id } = params;
  try {
    const userProfessionalDetails = await User.findOne({
      _id: id,
    })
      .populate("professionalDetails.experiences")
      .populate("professionalDetails.education")
      .populate("professionalDetails.certification");

    if (!userProfessionalDetails) {
      return new Response("User not found", { status: 404 });
    }
    const { professionalDetails } = userProfessionalDetails;

    return new Response(JSON.stringify(professionalDetails), {
      status: 200,
    });
  } catch (error) {
    return new Response("Internal server error", { status: 500 });
  }
};
