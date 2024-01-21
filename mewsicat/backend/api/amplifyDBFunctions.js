import { API, graphqlOperation } from 'aws-amplify'
import { makeRedirectUri } from 'expo-auth-session';

import {
    withAuthenticator,
    useAuthenticator,
  } from '@aws-amplify/ui-react-native';
  
import { Audio } from 'expo-av';

  
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../src/amplifyconfiguration.json';
Amplify.configure(awsExports);

import { createUser, updateUser, deleteUser, createFriend, createSong, deleteFriend, createCat, updateCat, updateFriend } from '../../src/graphql/mutations'
import { listUsers, getUser, userByName, friendByName, getCat, catByName, getFriend } from '../../src/graphql/queries'
import { refreshAsync, TokenResponse, exchangeCodeAsync } from 'expo-auth-session';
import * as Linking from 'expo-linking';
import { updateUserCat } from '../../screens/Modules';
import { generateFriendsList } from '../../screens/GrayScreen';
import { registerForPushNotificationsAsync, sendFriendReqPushNotification, sendPushNotification, acceptFriendReqPushNotification, sendSongPushNotification } from '../pushNotifications';

const client_id = "88c17d6f25cc43eaad226930c216ae5b";
const client_secret = "55c8fe6737b44bf39b7671aec4572402";
// for production: makeRedirectUri({scheme: 'mewsicat'})
const redirect_uri = makeRedirectUri({scheme: 'mewsicat'}); // for expo go: Linking.createURL("/spotify-auth-callback")

const catSprites = ["black", "blue", "brown", "gray", "calico"];


const discovery = {
  authorizationEndpoint: "https://accounts.spotify.com/authorize",
  tokenEndpoint: "https://accounts.spotify.com/api/token",
};

export async function addAccessory(accessory){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const currUserParams = {
    name: currentUser
    };
  
    const catResult = await API.graphql(graphqlOperation(catByName, currUserParams));
    const catResultID = catResult.data.catByName.items[0].id;
    var newAccessories = catResult.data.catByName.items[0].availableAccessories;

    newAccessories.push(accessory);

    const res = await API.graphql({
    query: updateCat, 
    variables: {
      input: {
        id: catResultID,
        availableAccessories: newAccessories,
      }
    }
    })
}

export async function equipAccessory(accessory){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const currUserParams = {
    name: currentUser
    };
  
    const catResult = await API.graphql(graphqlOperation(catByName, currUserParams));
    const catResultID = catResult.data.catByName.items[0].id;
    var newEquippedAccessories = catResult.data.catByName.items[0].equippedAccessories;

    newEquippedAccessories.push(accessory);

    const res = await API.graphql({
    query: updateCat, 
    variables: {
      input: {
        id: catResultID,
        equippedAccessories: newEquippedAccessories,
      }
    }
    })
}

export async function dequipAccessory(accessory){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const currUserParams = {
    name: currentUser
    };
  
    const catResult = await API.graphql(graphqlOperation(catByName, currUserParams));
    const catResultID = catResult.data.catByName.items[0].id;
    var newEquippedAccessories = catResult.data.catByName.items[0].equippedAccessories;

    for(let i = 0; i < newEquippedAccessories.length; i++){
      if(newEquippedAccessories[i] == accessory){
        newEquippedAccessories.splice(i, 1);
      }
    }

    const res = await API.graphql({
    query: updateCat, 
    variables: {
      input: {
        id: catResultID,
        equippedAccessories: newEquippedAccessories,
      }
    }
    })
}


export async function getCatSprite(){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const params = {
    name: currentUser
    };
    const result = await API.graphql(graphqlOperation(userByName, params));
    const catSprite = result.data.userByName.items[0].cat.items[0].catSprite;
    console.log("cat sprite: " + catSprite);
    return catSprite;
}



export async function currentUserInfo () {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.currentUserInfo();
      console.log(result); // SUCCESS
    } catch(err) {
      console.log(err);
    }
  };

  export async function listFriends(){
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;
  
    const params = {
    name: currentUser
    };
    const result = await API.graphql(graphqlOperation(userByName, params));
    const friendsID = result.data.userByName.items[0].id;
    const friends = result.data.userByName.items[0].friends;
    console.log("Your friends: " + friends);
  }

export async function checkFriend(friendName){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const params = {
  name: currentUser
  };
  const result = await API.graphql(graphqlOperation(userByName, params));
  const friendsID = result.data.userByName.items[0].id;
  const friends = result.data.userByName.items[0].friends;
  for(let i = 0; i < friends.length; i++){
    if(friends[i] == friendName){
      console.log("Already have as a friend.");
      return;
    }
  }
  console.log("Not a friend");
}

export async function checkFirstTimeUser(){
  try{
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const params = {
  name: currentUser
  };
  const result = await API.graphql(graphqlOperation(userByName, params));
  const firstTimeUser = result.data.userByName.items[0].firstTimeUser;
  if(firstTimeUser == undefined){
    return true;
  }
  else{
    return false;
  }
}
catch(err){
  console.log(err);
  return true;
}
}

export async function updateFirstTimeUser(){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const params = {
  name: currentUser
  };
  const result = await API.graphql(graphqlOperation(userByName, params));
  const userID = result.data.userByName.items[0].id;
  
  const res = await API.graphql({
    query: updateUser, 
    variables: {
      input: {
        id: userID,
        firstTimeUser: true,
      }
    }
    })
}

export async function checkUser(){
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;
    const db_id = currentUserInfo.attributes['custom:db_id'];
    console.log(db_id)

    const params = {
    name: currentUser
    };
    const result = await API.graphql(graphqlOperation(userByName, params));
    //console.log("result " + id);
    if(db_id != undefined){
      console.log("User already created.");
      return;
    }
    else{
      console.log("Creating user...");
      createUserInDB();
    }
}

export async function getSpotifyToken(){
    try{
      const currentUserInfo = await Auth.currentUserInfo();
      const token = currentUserInfo.attributes['custom:spotify_token'];
      //console.log("spotify token!: " + spotify_token);
      setSpotifyToken(token);
    } catch(err){
      console.log(err);
    }
  }

export async function sendSong(friend, musicRecURI){
  try{

  // getting song info from spotify
  const currentUserInfo = await Auth.currentUserInfo();
  const access_token = currentUserInfo.attributes['custom:spotify_token'];
  const currentUser = currentUserInfo.username;
  var profilePic;
  var artist;

  const friendParams = {
    name: friend
  };

  const friendRes = await API.graphql(graphqlOperation(userByName, friendParams));
  const friendID = friendRes.data.userByName.items[0].id;
  const friendsPushToken = friendRes.data.userByName.items[0].expoPushToken;
  // var newSong;
  var songResult = await fetch(
    `https://api.spotify.com/v1/tracks/${musicRecURI}`,
    {
        method: "GET",
        headers: { Authorization: "Bearer " + access_token },
    },
    )
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        spotifyID = data.id;
        songName = data.name;
        profilePic = data.album.images[0].url;
        artist = data.artists[0].name;
        console.log("spotify id: " + spotifyID);
        console.log("song name: " + songName);
        //
    });
    
    const newSong = await API.graphql({
      query: createSong,
      variables: {
        input: {
          songID: friendID,
          name: songName,
          spotifyID: spotifyID,
          artist: artist,
          songFrom: currentUser
        }
      }
    });
    console.log(newSong);
    sendSongPushNotification(friendsPushToken, currentUser);

  
  // // sending song to friend
  // const params = {
  //   name: friend
  //   };
  //   const result = await API.graphql(graphqlOperation(userByName, params));
  //   const friendsID = result.data.userByName.items[0].id;
  //   const friendSongs = result.data.userByName.items[0].songs;
  //   console.log("friend songs" + friendSongs);
  //   var newFriendSongs = [];

  //   if(friendSongs == null){
  //     newFriendSongs.push(newSong);
  //   }
  //   else{
  //     newFriendSongs = friendSongs;
  //     newFriendSongs.push(newSong);
  //   }

  //   const res = await API.graphql({
  //   query: updateUser, 
  //   variables: {
  //     input: {
  //       id: friendsID,
  //       songs: newFriendSongs,
  //     }
  //   }
  //   })
  }catch(err) {
    console.log(err);
  } 
}
export async function getNewToken(){
  const currentUserInfo = await Auth.currentUserInfo();
  const refresh_token = currentUserInfo.attributes['custom:refresh_token'];
  const codeRes = await refreshAsync(
    {
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken: refresh_token
    },
    discovery
)
  const tokenConfig = codeRes?.getRequestConfig();
  const tokenTimeGot = Date.now();
  console.log("access token in new token func: " + tokenConfig.accessToken);
  console.log("token time got in new token func: " + tokenTimeGot);
  console.log("refresh token in new token func: " + refresh_token);
  updateUserAttributes(tokenConfig.accessToken, refresh_token, tokenTimeGot);
}

export async function getToken (code) {
  const codeRes = await exchangeCodeAsync(
      {
          code: code,
          redirectUri: redirect_uri,
          clientId: client_id,
          clientSecret: client_secret
      },
      discovery
    
  )
  const tokenConfig = codeRes?.getRequestConfig();
  const tokenTimeGot = Date.now();
  console.log("access token: " + tokenConfig.accessToken);
  console.log("tokenTimeGot: " + tokenTimeGot);
  updateUserAttributes(tokenConfig.accessToken, tokenConfig.refreshToken, tokenTimeGot)
}

export async function updateSpotifyConnected (val) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, {
      "custom:spotifyConnected"	: val,
    });
    console.log(result); // SUCCESS
  } catch(err) {
    console.log(err);
  }
};

export async function getSpotifyConnected(){
  try{
  const currentUserInfo = await Auth.currentUserInfo();
  const spotify_connected = currentUserInfo.attributes["custom:spotifyConnected"];
  console.log("spotify connected: " + spotify_connected);
  if(spotify_connected == "1"){
    // spotifyConnected = true;
    return true;
  }
  else{
    // spotifyConnected = false;
    return false;
  }
  }catch(err) {
    console.log(err);
  } 
}

export async function checkTokenStatus(){
  const currentUserInfo = await Auth.currentUserInfo();
  const tokenTimeGot = currentUserInfo.attributes['custom:tokenTimeGot'];
  const millis = Date.now() - Number(tokenTimeGot);
  const timeElapsed = Math.floor(millis / 1000);
  console.log("time elapsed: " + timeElapsed);
  if(timeElapsed < 3600){
    console.log("token still fresh");
  }
  else{
    console.log("token not fresh");
    getNewToken();
  }
}


export async function updateUserAttributes (access_token, refresh_token, tokenTimeGot) {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const result = await Auth.updateUserAttributes(user, {
      "custom:spotify_token" : access_token,
      "custom:refresh_token" : refresh_token,
      "custom:tokenTimeGot" : tokenTimeGot.toString()

    });
    console.log(result); // SUCCESS
  } catch(err) {
    console.log(err);
  }
};

export async function setSpotifyConnected(){
  try{
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;

    const params = {
    name: currentUser
    };
    const result = await API.graphql(graphqlOperation(userByName, params));
    const userID = result.data.userByName.items[0].id;
    const spotifyConnected = result.data.userByName.items[0].spotifyConnected;


    const res = await API.graphql({
      query: updateUser, 
      variables: {
        input: {
          id: userID,
          name: currentUser,
          spotifyConnected: true,
        }
      }
      })
      console.log(res);
    
  }catch(err){
    console.log(err);
  }
}

export async function sendFriendRequest(newFriend){
  try{
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;
    
    const params = {
      name: newFriend
    };
    const result = await API.graphql(graphqlOperation(userByName, params));
    const friendsID = result.data.userByName.items[0].id;
    const friendRequests = result.data.userByName.items[0].friendRequests;
    const friendsExpoToken = result.data.userByName.items[0].expoPushToken;
    console.log("friend requests" + friendRequests)
    var newFriendRequests = [];
    
    if(friendRequests == null){
      newFriendRequests.push(currentUser);
    }
    else{
      newFriendRequests = friendRequests;
      newFriendRequests.push(currentUser);
    }

    const res = await API.graphql({
    query: updateUser, 
    variables: {
      input: {
        id: friendsID,
        friendRequests: newFriendRequests
      }
    }
    })
    await sendFriendReqPushNotification(friendsExpoToken, currentUser);
    console.log(res);
  } catch(err){
    console.log(err);
  }
}

export async function removeFriend(friendToRemove) {
  try {
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;

    const userParams = {
      name: currentUser
    };
    const userRes = await API.graphql(graphqlOperation(userByName, userParams));
    const currentUserId = userRes.data.userByName.items[0].id;
    let currentFriends = userRes.data.userByName.items[0].friends.items;

    const friendObj = currentFriends.find(friend => friend.name === friendToRemove);
    if (!friendObj) {
      console.log(`${friendToRemove} is not in your freind list.`);
      return;
    }
    const deleteRes = await API.graphql({
      query: deleteFriend,
      variables: {
        input: {
          id: friendObj.id
        }
      }
    });

    const deletedFriendParams = {
      name: friendToRemove
    };
      const deletedFriendResult = await API.graphql(graphqlOperation(userByName, deletedFriendParams));
      const deletedFriendsID = deletedFriendResult.data.userByName.items[0].id;
      let deletedFriendsFriend = deletedFriendResult.data.userByName.items[0].friends.items;
      const DeletedFriendObject = deletedFriendsFriend.find(friend => friend.name === currentUser);

    const createCurrUserObj = await API.graphql({
      query: deleteFriend, 
      variables: { 
        input: {
          id: DeletedFriendObject.id
        }
      }
    });

    console.log(`Friend removed successfully: ${friendToRemove}`);

  } catch (err) {
    console.log(err);
  }
}

export async function rejectFriendRequest(newFriend){
  try{
    // adding friend to curr user
    const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;

      const currUserParams = {
        name: currentUser
        };
      const currUserResult = await API.graphql(graphqlOperation(userByName, currUserParams));
      const currUserID = currUserResult.data.userByName.items[0].id;
      const currUserFriendRequests = currUserResult.data.userByName.items[0].friendRequests;
      const friends = currUserResult.data.userByName.items[0].friends;
      var newCurrUserFriendRequests = [];

      newCurrUserFriendRequests = currUserFriendRequests;
      const newFriendIndex = newCurrUserFriendRequests.indexOf(newFriend);
          if (newFriendIndex > -1) { // only splice array when item is found
            newCurrUserFriendRequests.splice(newFriendIndex, 1); // 2nd parameter means remove one item only
          }
      const currUserRes = await API.graphql({
        query: updateUser, 
        variables: {
          input: {
            id: currUserID,
            friendRequests: newCurrUserFriendRequests
          }
        }
        })

  } catch(err){
    console.log(err);
  }
}

export async function acceptFriendRequest(newFriend){
  try{
    // curr user params
    const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;

      const currUserParams = {
        name: currentUser
        };
      const currUserResult = await API.graphql(graphqlOperation(userByName, currUserParams));
      const currUserID = currUserResult.data.userByName.items[0].id;
      const currUserCatName = currUserResult.data.userByName.items[0].cat.items[0].name;
      const currUserCatFishes = currUserResult.data.userByName.items[0].cat.items[0].fishes;
      const currUserCatType = currUserResult.data.userByName.items[0].cat.items[0].type;
      const currUserCatSprite = currUserResult.data.userByName.items[0].cat.items[0].catSprite;
      const friends = currUserResult.data.userByName.items[0].friends;
      const currUserFriendRequests = currUserResult.data.userByName.items[0].friendRequests;
      var newCurrUserFriendRequests = [];

      newCurrUserFriendRequests = currUserFriendRequests;
      const newFriendIndex = newCurrUserFriendRequests.indexOf(newFriend);
          if (newFriendIndex > -1) { // only splice array when item is found
            newCurrUserFriendRequests.splice(newFriendIndex, 1); // 2nd parameter means remove one item only
          }
      

      // friend params
      const friendParams = {
        name: newFriend
        };
        const newFriendResult = await API.graphql(graphqlOperation(userByName, friendParams));
        const newFriendsID = newFriendResult.data.userByName.items[0].id;
        const newFriendsCatName = newFriendResult.data.userByName.items[0].cat.items[0].name;
        const newFriendsCatFishes = newFriendResult.data.userByName.items[0].cat.items[0].fishes;
        const newFriendsCatType = newFriendResult.data.userByName.items[0].cat.items[0].type;
        const newFriendsCatSprite = newFriendResult.data.userByName.items[0].cat.items[0].catSprite;
        const newFriendsPushToken = newFriendResult.data.userByName.items[0].expoPushToken;
      
        // create friend cat object
      const catRes = await API.graphql({
        query: createCat, 
        variables: {
          input: {
            catID: newFriendsID,
            name: newFriend,
            type: newFriendsCatType,
            fishes: newFriendsCatFishes,
            catSprite: newFriendsCatSprite
          }
        }
      });

      const catID = catRes.data.createCat.id;
      console.log(catRes);
      console.log(catID);

      // creating friend object
      const friendRes = await API.graphql({
        query: createFriend, 
        variables: {
          input: {
            friendID: currUserID,
            name: newFriend,
            friendCatId: catID,
          }
        }
      });
      const friendObjID = friendRes.data.createFriend.friendCatId;
      console.log("curr user friend result ID: " + friendObjID);
      console.log(friendRes);

      console.log("curr user friend cat done!");

      console.log("pushed to currUser!")

      //creating current user cat object
      const currUserCat = await API.graphql({
        query: createCat, 
        variables: { 
          input: {
            catID: currUserID,
            name: currentUser,
            type: currUserCatType,
            fishes: currUserCatFishes,
            catSprite: currUserCatSprite
          }
        }
      });

      console.log(currUserCat);

      const currUserCatID = currUserCat.data.createCat.id;


        // creating current user object
      const createCurrUserObj = await API.graphql({
        query: createFriend, 
        variables: { 
          input: {
            friendID: newFriendsID,
            name: currentUser,
            friendCatId: currUserCatID,
          }
        }
      });

      console.log(createCurrUserObj)

      const currUserObjID = createCurrUserObj.data.createFriend.friendCatId;
      console.log("curr user friend result ID: " + currUserObjID);

      console.log("curr user friend cat done!");

      console.log("new friend result: " + createCurrUserObj);
      console.log("pushed to newFriend!")

      const currUserRes = await API.graphql({
        query: updateUser, 
        variables: {
          input: {
            id: currUserID,
            friendRequests: newCurrUserFriendRequests
          }
        }
        })

        await acceptFriendReqPushNotification(newFriendsPushToken, currentUser);
        await generateFriendsList();
  } catch(err){
    console.log(err);
  }
}

export async function createNewCat(){

  var topArtistsGenre;

  const currentUserInfo = await Auth.currentUserInfo();
        const access_token = currentUserInfo.attributes['custom:spotify_token'];
        console.log("access token: " + access_token);
        var userRes = await fetch(
            `https://api.spotify.com/v1/me/top/artists`,
            {
                method: "GET",
                headers: { Authorization: "Bearer " + access_token },
            },
        )
            .then((res) => res.json())
            .then((data) => {
                console.log("top artist in function: " + data.items[0].name);
                topArtists = data.items[0].uri;
                console.log(data.items[0].genres[0]);
                topArtistsGenre = data.items[0].genres[0];
                topArtists = topArtists.substring(15);
                // topArtistsGenres = data.items[0].genre;
                // console.log("top artists genres in function: " + topArtistsGenres);
            });
  const currentUser = currentUserInfo.username;

  const currUserParams = {
    name: currentUser
    };
  const currUserResult = await API.graphql(graphqlOperation(userByName, currUserParams));
  const currUserID = currUserResult.data.userByName.items[0].id;

  const newCatSprite = Math.floor(Math.random() * catSprites.length);
  // creating cat object
  const catRes = await API.graphql({
    query: createCat, 
    variables: {
      input: {
        catID: currUserID,
        name: currentUser,
        type: topArtistsGenre,
        fishes: 0,
        catSprite: newCatSprite
      }
    }
  });
  console.log("curr user cat result: " + catRes);
  console.log("pushed to currUser!")

}

export async function increaseFishes(){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const currUserParams = {
    name: currentUser
    };
  
    const catResult = await API.graphql(graphqlOperation(catByName, currUserParams));
    const catResultID = catResult.data.catByName.items[0].id;
    var fishes = catResult.data.catByName.items[0].fishes;
    fishes++;

    const updateCatRes = await API.graphql({
      query: updateCat, 
      variables: {
        input: {
          id: catResultID,
          fishes: fishes,
        }
      }
    });
    await updateUserCat();
}

export async function decreaseFishes(decreaseBy){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const currUserParams = {
    name: currentUser
    };
  
    const catResult = await API.graphql(graphqlOperation(catByName, currUserParams));
    const catResultID = catResult.data.catByName.items[0].id;
    var fishes = catResult.data.catByName.items[0].fishes;
    fishes -= decreaseBy;

    const updateCatRes = await API.graphql({
      query: updateCat, 
      variables: {
        input: {
          id: catResultID,
          fishes: fishes,
        }
      }
    });
    await updateUserCat();
}



export async function addFriend(newFriend){
    try{
      const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;

      const currUserParams = {
        name: currentUser
        };
      const currUserResult = await API.graphql(graphqlOperation(userByName, currUserParams));
      const currUserID = currUserResult.data.userByName.items[0].id;

      // creating friend object
      const friendRes = await API.graphql({
        query: createFriend, 
        variables: {
          input: {
            friendID: currUserID,
            name: newFriend
          }
        }
      });
      console.log(friendRes);
    }catch(err){
      console.log(err);
    }
  }

export async function createUserInDB(){
    try{
      // Create User in the database
      const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;

      const expoPushToken = await registerForPushNotificationsAsync();
      

      const createUserRes = await API.graphql({
        query: createUser, 
        variables: {
          input: {
            name: currentUser,
            expoPushToken: expoPushToken
          }
        }
      })

      const params = {
      name: currentUser
      };
      const res = await API.graphql(graphqlOperation(userByName, params));
      const db_id = res.data.userByName.items[0].id;

      const user = await Auth.currentAuthenticatedUser();
      const result = await Auth.updateUserAttributes(user, {
      "custom:db_id" : db_id
      });
      console.log(result); // SUCCESS

      console.log("User created!");

    } catch(err){
      console.log(err);
    }
  }

  export async function testNotifications(){
    const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;

     const params = {
      name: currentUser
      };
      const res = await API.graphql(graphqlOperation(userByName, params));
      const expoPushToken = res.data.userByName.items[0].expoPushToken;

      await sendPushNotification(expoPushToken);
  }