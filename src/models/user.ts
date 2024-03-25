import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phrasalVerbs: [
        {
          phrasalVerbId: { type: Schema.Types.ObjectId, ref: "PhrasalVerb" },
          verb: String,
          example: String,
        },
    ],
}, {timestamps: true}
);

const User = models.User || mongoose.model("User", userSchema);
export default User;