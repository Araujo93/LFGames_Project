import mongoose from 'mongoose';

interface IGame {
  gameId: number,
  name: string,
  'cover.url': string,
  total_rating: number,
  cover_image_id: string,
  genres: string[],
  platforms: string[],
  first_release_date: number,
  completed: boolean,
  user: mongoose.Schema.Types.ObjectId
}

const gameSchema = new mongoose.Schema({
  gameId: {
    type: Number
  },
  name: {
    type: String,
  },
  'cover.url': {
    type: String
  },
  total_rating: {
    type: Number,
  },
  cover_image_id: {
    type: String
  },
  genres: {
    type: Array
  },
  platforms: {
    type: Array
  },
  first_release_date: {
    type: Number
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const game = mongoose.model<IGame>("Games", gameSchema);
export default game;
