import { API, graphqlOperation } from 'aws-amplify'

import {
    withAuthenticator,
    useAuthenticator,
  } from '@aws-amplify/ui-react-native';
  
import { Amplify, Auth } from 'aws-amplify';
import awsExports from '../../src/aws-exports';
Amplify.configure(awsExports);

import { createUser, updateUser, deleteUser } from '../../src/graphql/mutations'
import { listUsers, getUser, userByName } from '../../src/graphql/queries'

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

export async function acceptFriendRequest(newFriend){
  try{
    const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;

      const currUserParams = {
      name: currentUser
      };
      const currUserResult = await API.graphql(graphqlOperation(userByName, currUserParams));
      const currUserID = currUserResult.data.userByName.items[0].id;
      const currUserFriends = currUserResult.data.userByName.items[0].friends;
      const currUserFriendRequests = currUserResult.data.userByName.items[0].friendRequests;
      var newCurrUserFriends = [];
      var newCurrUserFriendRequests = [];
    
    // if(currUserFriends == null){
    //   newCurrUserFriends.push(newFriend);
    // }
    // else{
      newCurrUserFriends = currUserFriends;
      newCurrUserFriends.push(newFriend);
      newCurrUserFriendRequests = currUserFriendRequests;
      const newFriendIndex = newCurrUserFriendRequests.indexOf(newFriend);
          if (newFriendIndex > -1) { // only splice array when item is found
            newCurrUserFriendRequests.splice(newFriendIndex, 1); // 2nd parameter means remove one item only
          }
    // }

      // newFriends.push(friendName);
      // console.log("New Friends: " + newFriends);

      const currUserRes = await API.graphql({
      query: updateUser, 
      variables: {
        input: {
          id: currUserID,
          name: currentUser,
          friends: newCurrUserFriends,
          friendRequests: newCurrUserFriendRequests
        }
      }
      })
      console.log(currUserRes);
      console.log("pushed to currUser!");

      const friendParams = {
        name: newFriend
        };
        const newFriendResult = await API.graphql(graphqlOperation(userByName, friendParams));
        const newFriendsID = newFriendResult.data.userByName.items[0].id;
        const friends = newFriendResult.data.userByName.items[0].friends;
        const friendRequests = newFriendResult.data.userByName.items[0].friendRequests;
        var newFriends = [];
        // var newFriendRequests = [];
    
        // if(friends == null){
        //   newFriends.push(currentUser);
        // }
        // else{
          newFriends = friends;
          newFriends.push(currentUser);
          // newFriendRequests = friendRequests;
          // const currUserIndex = newFriendRequests.indexOf(currentUser);
          // if (currUserIndex > -1) { // only splice array when item is found
          //   newFriendRequests.splice(currUserIndex, 1); // 2nd parameter means remove one item only
          // }
        // }
  
        // newFriends.push(friendName);
        // console.log("New Friends: " + newFriends);
  
        const res = await API.graphql({
        query: updateUser, 
        variables: {
          input: {
            id: newFriendsID,
            name: newFriend,
            friends: newFriends,
            // friendRequests: newFriendRequests
          }
        }
        })
        console.log(res);
        console.log("pushed to newFriend!")


  } catch(err){
    console.log(err);
  }
}


export async function addFriend(newFriend){
    try{
      const currentUserInfo = await Auth.currentUserInfo();
      const currentUser = currentUserInfo.username;

      const params = {
      name: currentUser
      };
      const result = await API.graphql(graphqlOperation(userByName, params));
      const friendsID = result.data.userByName.items[0].id;
      const friends = result.data.userByName.items[0].friends;
      var newFriends = [];

      newFriends = friends;
      newFriends.push(newFriend);

      // newFriends.push(friendName);
      // console.log("New Friends: " + newFriends);

      const res = await API.graphql({
      query: updateUser, 
      variables: {
        input: {
          id: friendsID,
          name: currentUser,
          friends: newFriends
        }
      }
      })
      console.log(res);
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
            friends: [],
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