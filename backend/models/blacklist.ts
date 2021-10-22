import mongoose from 'mongoose';

interface IBlacklist {
  token: string,
  user: mongoose.Schema.Types.ObjectId
}

const blacklistSchema = new mongoose.Schema<IBlacklist>({
  token: {
    type: String,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model<IBlacklist>("Blacklist", blacklistSchema);
export default model;
