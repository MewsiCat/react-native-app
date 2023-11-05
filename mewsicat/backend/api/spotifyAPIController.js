const CLIENT_ID = "88c17d6f25cc43eaad226930c216ae5b";
const CLIENT_SECRET = "55c8fe6737b44bf39b7671aec4572402";

export class SpotifyAPIController {
  constructor() {
    this.searchInput = "";
    this.accessToken = "";
    this.artist = "";
    this.gotToken = false;

    this.playlistTrackNames = [];
    this.playlistTrackCovers = [];
    this.playlistTrackArtists = [];
  }

  async getUser(access_token){
    var result = await fetch(
    `https://api.spotify.com/v1/me`,
    {
        method: "GET",
        headers: { Authorization: "Bearer " + access_token },
    },
    )
    .then((res) => res.json())
    .then((data) => console.log(data));
  }

//   async getAccessToken() {
//     var authParams = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body:
//         "grant_type=client_credentials&client_id=" +
//         CLIENT_ID +
//         "&client_secret=" +
//         CLIENT_SECRET,
//     };
//     var res = await fetch("https://accounts.spotify.com/api/token", authParams)
//       .then((res) => res.json())
//       .then((data) => {
//         this.accessToken = data.access_token;
//       });
//     console.log("acces token func " + this.accessToken);
//   }


  async getSong(trackEndPoint) {
    await this.getAccessToken();
    console.log("song func " + this.accessToken);
    var result = await fetch(
      `https://api.spotify.com/v1/tracks/${trackEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  async getSongArtist(trackEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/tracks/${trackEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data.artists[0].id));
  }

  async getArtist(artistEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${artistEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  async getArtistGenre(artistEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/artists/${artistEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data.genres));
  }

  async getTrackCover(trackEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/tracks/${trackEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data.album.images[0].url));
  }

  async getPlaylist(playlistEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  }

  async getPlaylistTracks(playlistEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => console.log(data.tracks.items));
  }

  async getPlaylistTrackNames(playlistEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.tracks.limit; i++) {
          this.playlistTrackNames[i] = data.tracks.items[i].track.name;
          //console.log(data.tracks.items[i].track.name)
        }
      });
  }

  async getPlaylistTrackArtists(playlistEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.tracks.limit; i++) {
          this.playlistTrackArtists[i] =
            data.tracks.items[i].track.artists[0].name;
          //console.log(data.tracks.items[i].track.name)
        }
      });
  }

  async getPlaylistTrackCovers(playlistEndPoint) {
    await this.getAccessToken();
    const result = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistEndPoint}`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + this.accessToken },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        for (let i = 0; i < data.tracks.limit; i++) {
          this.playlistTrackCovers[i] =
            data.tracks.items[i].track.album.images[0].url;
          //console.log(data.tracks.items[i].album.images[0].url)
        }
      });
  }
}
