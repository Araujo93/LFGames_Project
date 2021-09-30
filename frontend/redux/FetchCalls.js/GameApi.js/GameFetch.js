import { CLIENT_ID, API_TOKEN } from "@env";
const URL = "http://192.168.2.16:3000/";

export const getGameInfo = async (Mbody) => {
  try {
    const response = await fetch("https://api.igdb.com/v4/" + "games", {
      method: "POST",
      headers: {
        "Client-ID": `${CLIENT_ID}`,
        Authorization: `Bearer ${API_TOKEN}`,
        "content-type": "text/plain",
      },
      body: Mbody,
    });
    const data = await response.json();
    data.map((game) => {
      if (game.cover) {
        game.cover.url = `http://images.igdb.com/igdb/image/upload/t_cover_big/${game.cover.image_id}.jpg`;
      } else {
        game.cover = {
          url: "http://example.com",
        };
      }
    });
    return data;
  } catch (err) {
    console.log(err);
  }
};
