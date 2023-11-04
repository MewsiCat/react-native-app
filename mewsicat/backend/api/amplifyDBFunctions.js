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
      // const tempName = "bam"
      

      const createUserRes = await API.graphql({
        query: createUser, 
        variables: {
          input: {
            name: currentUser,
            friends: [""]
          }
        }
      })

      const params = {
        name: currentUser
      };
      const result = await API.graphql(graphqlOperation(userByName, params));
      const friends = result.data.userByName.items[0].friends;
      console.log(friends);

      // Assigning ID created form User object to Auth database

      // const user = await Auth.currentAuthenticatedUser();
      // const updateDBIDRes = await Auth.updateUserAttributes(user, {
      //   "custom:db_id" : db_id
      // });
      // console.log(result); // SUCCESS
      //console.log("spotify token!: " + spotify_token);
      //setSpotifyToken(token);
    } catch(err){
      console.log(err);
    }
  }