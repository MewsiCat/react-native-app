/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
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
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onCreateFriend(filter: $filter) {
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
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onUpdateFriend(filter: $filter) {
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
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend($filter: ModelSubscriptionFriendFilterInput) {
    onDeleteFriend(filter: $filter) {
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
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong($filter: ModelSubscriptionSongFilterInput) {
    onCreateSong(filter: $filter) {
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
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong($filter: ModelSubscriptionSongFilterInput) {
    onUpdateSong(filter: $filter) {
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
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong($filter: ModelSubscriptionSongFilterInput) {
    onDeleteSong(filter: $filter) {
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
