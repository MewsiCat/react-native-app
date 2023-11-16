/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      friends {
        items {
          id
          name
          profilePic
          cat
          createdAt
          updatedAt
          userFriendsId
          __typename
        }
        nextToken
        __typename
      }
      cat
      friendRequests
      songs {
        items {
          id
          name
          artist
          spotifyID
          createdAt
          updatedAt
          userSongsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      friends {
        items {
          id
          name
          profilePic
          cat
          createdAt
          updatedAt
          userFriendsId
          __typename
        }
        nextToken
        __typename
      }
      cat
      friendRequests
      songs {
        items {
          id
          name
          artist
          spotifyID
          createdAt
          updatedAt
          userSongsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      friends {
        items {
          id
          name
          profilePic
          cat
          createdAt
          updatedAt
          userFriendsId
          __typename
        }
        nextToken
        __typename
      }
      cat
      friendRequests
      songs {
        items {
          id
          name
          artist
          spotifyID
          createdAt
          updatedAt
          userSongsId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
      id
      name
      profilePic
      cat
      createdAt
      updatedAt
      userFriendsId
      __typename
    }
  }
`;
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
      id
      name
      profilePic
      cat
      createdAt
      updatedAt
      userFriendsId
      __typename
    }
  }
`;
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
      id
      name
      profilePic
      cat
      createdAt
      updatedAt
      userFriendsId
      __typename
    }
  }
`;
export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $input: CreateSongInput!
    $condition: ModelSongConditionInput
  ) {
    createSong(input: $input, condition: $condition) {
      id
      name
      artist
      spotifyID
      createdAt
      updatedAt
      userSongsId
      __typename
    }
  }
`;
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
      id
      name
      artist
      spotifyID
      createdAt
      updatedAt
      userSongsId
      __typename
    }
  }
`;
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
      id
      name
      artist
      spotifyID
      createdAt
      updatedAt
      userSongsId
      __typename
    }
  }
`;
