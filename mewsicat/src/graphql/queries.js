/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getFriend = /* GraphQL */ `
  query GetFriend($id: ID!) {
    getFriend(id: $id) {
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
export const listFriends = /* GraphQL */ `
  query ListFriends(
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriends(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
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
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const userByName = /* GraphQL */ `
  query UserByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const friendByName = /* GraphQL */ `
  query FriendByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const songByName = /* GraphQL */ `
  query SongByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    songByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
