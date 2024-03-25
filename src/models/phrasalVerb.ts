import mongoose, { Schema } from 'mongoose';

const PhrasalVerbSchema = new Schema({
  verb: {
    type: String,
    required: true
  },
  example: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: String,
  userEmail: String
}, {
  timestamps: true,
});

const PhrasalVerb = mongoose.models.PhrasalVerb || mongoose.model("PhrasalVerb", PhrasalVerbSchema);

export default PhrasalVerb;