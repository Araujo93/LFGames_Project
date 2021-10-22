

// backend/models/games.ts
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

export interface IGameState {
  userGames: any[]
}

// services/UserService
// export interface ISignInRes {
//   user: {
//     userName: string
//     email: string
//   } 
// }
export interface IUserInfo {
  userName: string,
  email: string,
  password: string,
}
export interface IUserService {
  signUp: Function
  signIn: Function
  signOut: Function
}

export interface IGamesService {
  addGameToList: Function
  getGameDetails: Function
}
