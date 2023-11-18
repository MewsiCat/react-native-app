import { API, graphqlOperation } from 'aws-amplify'

import {
    withAuthenticator,
    useAuthenticator,
  } from '@aws-amplify/ui-react-native';
  
  
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../src/aws-exports';
Amplify.configure(awsExports);

import { createUser, updateUser, deleteUser, createFriend, createSong, deleteFriend } from '../../src/graphql/mutations'
import { listUsers, getUser, userByName, friendByName } from '../../src/graphql/queries'


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
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const params = {
  name: currentUser
  };
  const result = await API.graphql(graphqlOperation(userByName, params));
  const userID = result.data.userByName.items[0].firstTimeUser;
  if(firstTimeUser == undefined){
    return false;
  }
  else{
    return true;
  }
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
  var profilePic;
  var artist;

  const friendParams = {
    name: friend
  };

  const friendRes = await API.graphql(graphqlOperation(userByName, friendParams));
  const friendID = friendRes.data.userByName.items[0].id;
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
        }
      }
    });
    console.log(newSong);

  
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

// not gonna work cause you can't return things in async functions
// export async function checkSpotifyConnected(){
//   try{
//     const currentUserInfo = await Auth.currentUserInfo();
//     const currentUser = currentUserInfo.username;

//     const params = {
//     name: currentUser
//     };
//     const result = await API.graphql(graphqlOperation(userByName, params));
//     const spotifyConnected = result.data.userByName.items[0].spotifyConnected;

//     if(spotifyConnected == true){
//       return true;
//     }
//     else{
//       return false;
//     }
    
//   }catch(err){
//     console.log(err);
//   }
// }

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
    console.log("friend requests" + friendRequests)
    var newFriendRequests = [""];
    
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


export async function acceptFriendRequest(newFriend){
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
      console.log("curr user friend result: " + friendRes);
      console.log("pushed to currUser!")


      // adding curr user to friend
      const friendParams = {
        name: newFriend
        };
        const newFriendResult = await API.graphql(graphqlOperation(userByName, friendParams));
        const newFriendsID = newFriendResult.data.userByName.items[0].id;

        // creating current user object
      const createCurrUserObj = await API.graphql({
        query: createFriend, 
        variables: { 
          input: {
            friendID: newFriendsID,
            name: currentUser
          }
        }
      });
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

  } catch(err){
    console.log(err);
  }
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
      // const currentUserInfo = await Auth.currentUserInfo();
      // const currentUser = currentUserInfo.username;

      // const params = {
      // name: currentUser
      // };
      // const result = await API.graphql(graphqlOperation(userByName, params));
      // const friendsID = result.data.userByName.items[0].id;
      // const friends = result.data.userByName.items[0].friends;
      // var newFriends = [];

      // newFriends = friends;
      // newFriends.push(newFriend);

      // // newFriends.push(friendName);
      // // console.log("New Friends: " + newFriends);

      // const res = await API.graphql({
      // query: updateUser, 
      // variables: {
      //   input: {
      //     id: friendsID,
      //     name: currentUser,
      //     friends: newFriends
      //   }
      // }
      // })
      // console.log(res);
    }catch(err){
      console.log(err);
    }
  }

export async function createUserInDB(){
    try{
      // Create User in the database
      const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;
      

      const createUserRes = await API.graphql({
        query: createUser, 
        variables: {
          input: {
            name: currentUser,
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