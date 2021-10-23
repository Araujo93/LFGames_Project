import mongoose from 'mongoose';

interface IUserSchema {
  userName: string,
  email: string,
  password: string,
  games: mongoose.Schema.Types.ObjectId[],
}

const userSchema = new mongoose.Schema<IUserSchema>({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Games'
    }
  ]
});


const model = mongoose.model<IUserSchema>("User", userSchema);
export default model;
