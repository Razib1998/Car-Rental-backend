/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
    phone: {
      type: String,
      required: [true, "Phone is Required"],
    },
    address: {
      type: String,
      required: [true, "Phone is Required"],
    },
  },
  {
    timestamps: true,
  }
);

// userSchema.pre("save", async function (next) {
//   const user = this;
//   // Hashing password before saving DB
//   user.password = await bcryptjs.hash(
//     user.password,
//     Number(config.bcrypt_salt_round)
//   );
//   next();
// });

// // set empty ""after saving password,

// userSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });

export const User = model<TUser>("User", userSchema);
