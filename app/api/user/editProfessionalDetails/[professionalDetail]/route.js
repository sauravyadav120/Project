import { connectToDb } from "@/lib/connect";
import User from "@/models/user";

export const PATCH = async (req, { params }) => {
  const { professionalDetail } = params;
  const { userId, recordId, editObject } = await req.json();

  try {
    await connectToDb();
    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }

    const professionalParameter =
      currentUser.professionalDetails[professionalDetail];

    if (!professionalParameter) {
      return new Response(
        `Professional detail '${professionalDetail}' not found`,
        { status: 404 }
      );
    }

    const recordToUpdate = professionalParameter.find(
      (record) => record._id.toString() === recordId
    );

    if (!recordToUpdate) {
      return new Response(`Record with ID '${recordId}' not found`, {
        status: 404,
      });
    }

    for (const key in editObject) {
      if (key in recordToUpdate) {
        recordToUpdate[key] = editObject[key];
      }
    }

    await currentUser.save();

    return new Response("Record updated successfully", { status: 200 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
