import { connectToDb } from "@/lib/connect";
import { giveHashPassword } from "@/lib/utils";
import User from "@/models/user";

export const POST = async (req) => {
  await connectToDb();

  try {
    const { name, email, password, professionalDetails,phone,bio,image } = await req.json();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("User already exists", { status: 403 });
    }

    // Hash the password
    const hashedPassword = await giveHashPassword(password);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      professionalDetails,
      phone,
      bio,
      image
    });

    // Save the new user to the database
    await newUser.save();

    return new Response(newUser, { status: 201 });
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
