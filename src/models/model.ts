import mongoose, { Schema } from 'mongoose';

const PhrasalVerbSchema = new Schema({
  verb: String,
  example: String
}, {
  timestamps: true,
});

const PhrasalVerb = mongoose.models.PhrasalVerb || mongoose.model("PhrasalVerb", PhrasalVerbSchema);

export default PhrasalVerb;
