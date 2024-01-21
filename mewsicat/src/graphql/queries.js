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
          friendID
          name
          profilePic
          cat {
            id
            catID
            name
            pic
            fishes
            type
            catSprite
            availableAccessories
            equippedAccessories
            createdAt
            updatedAt
            userCatId
            __typename
          }
          createdAt
          updatedAt
          userFriendsId
          friendCatId
          __typename
        }
        nextToken
        __typename
      }
      cat {
        items {
          id
          catID
          name
          pic
          fishes
          type
          catSprite
          availableAccessories
          equippedAccessories
          createdAt
          updatedAt
          userCatId
          __typename
        }
        nextToken
        __typename
      }
      firstTimeUser
      friendRequests
      songs {
        items {
          id
          songID
          name
          artist
          spotifyID
          songFrom
          createdAt
          updatedAt
          userSongsId
          __typename
        }
        nextToken
        __typename
      }
      expoPushToken
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
            friendID
            name
            profilePic
            cat {
              id
              catID
              name
              pic
              fishes
              type
              catSprite
              availableAccessories
              equippedAccessories
              createdAt
              updatedAt
              userCatId
              __typename
            }
            createdAt
            updatedAt
            userFriendsId
            friendCatId
            __typename
          }
          nextToken
          __typename
        }
        cat {
          items {
            id
            catID
            name
            pic
            fishes
            type
            catSprite
            availableAccessories
            equippedAccessories
            createdAt
            updatedAt
            userCatId
            __typename
          }
          nextToken
          __typename
        }
        firstTimeUser
        friendRequests
        songs {
          items {
            id
            songID
            name
            artist
            spotifyID
            songFrom
            createdAt
            updatedAt
            userSongsId
            __typename
          }
          nextToken
          __typename
        }
        expoPushToken
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getCat = /* GraphQL */ `
  query GetCat($id: ID!) {
    getCat(id: $id) {
      id
      catID
      name
      pic
      fishes
      type
      catSprite
      availableAccessories
      equippedAccessories
      createdAt
      updatedAt
      userCatId
      __typename
    }
  }
`;
export const listCats = /* GraphQL */ `
  query ListCats(
    $filter: ModelCatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCats(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        catID
        name
        pic
        fishes
        type
        catSprite
        availableAccessories
        equippedAccessories
        createdAt
        updatedAt
        userCatId
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
      friendID
      name
      profilePic
      cat {
        id
        catID
        name
        pic
        fishes
        type
        catSprite
        availableAccessories
        equippedAccessories
        createdAt
        updatedAt
        userCatId
        __typename
      }
      createdAt
      updatedAt
      userFriendsId
      friendCatId
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
        friendID
        name
        profilePic
        cat {
          id
          catID
          name
          pic
          fishes
          type
          catSprite
          availableAccessories
          equippedAccessories
          createdAt
          updatedAt
          userCatId
          __typename
        }
        createdAt
        updatedAt
        userFriendsId
        friendCatId
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
      songID
      name
      artist
      spotifyID
      songFrom
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
        songID
        name
        artist
        spotifyID
        songFrom
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
            friendID
            name
            profilePic
            cat {
              id
              catID
              name
              pic
              fishes
              type
              catSprite
              availableAccessories
              equippedAccessories
              createdAt
              updatedAt
              userCatId
              __typename
            }
            createdAt
            updatedAt
            userFriendsId
            friendCatId
            __typename
          }
          nextToken
          __typename
        }
        cat {
          items {
            id
            catID
            name
            pic
            fishes
            type
            catSprite
            availableAccessories
            equippedAccessories
            createdAt
            updatedAt
            userCatId
            __typename
          }
          nextToken
          __typename
        }
        firstTimeUser
        friendRequests
        songs {
          items {
            id
            songID
            name
            artist
            spotifyID
            songFrom
            createdAt
            updatedAt
            userSongsId
            __typename
          }
          nextToken
          __typename
        }
        expoPushToken
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const catsByCatID = /* GraphQL */ `
  query CatsByCatID(
    $catID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    catsByCatID(
      catID: $catID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        catID
        name
        pic
        fishes
        type
        catSprite
        availableAccessories
        equippedAccessories
        createdAt
        updatedAt
        userCatId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const catByName = /* GraphQL */ `
  query CatByName(
    $name: String!
    $sortDirection: ModelSortDirection
    $filter: ModelCatFilterInput
    $limit: Int
    $nextToken: String
  ) {
    catByName(
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        catID
        name
        pic
        fishes
        type
        catSprite
        availableAccessories
        equippedAccessories
        createdAt
        updatedAt
        userCatId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const friendsByFriendID = /* GraphQL */ `
  query FriendsByFriendID(
    $friendID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelFriendFilterInput
    $limit: Int
    $nextToken: String
  ) {
    friendsByFriendID(
      friendID: $friendID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        friendID
        name
        profilePic
        cat {
          id
          catID
          name
          pic
          fishes
          type
          catSprite
          availableAccessories
          equippedAccessories
          createdAt
          updatedAt
          userCatId
          __typename
        }
        createdAt
        updatedAt
        userFriendsId
        friendCatId
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
        friendID
        name
        profilePic
        cat {
          id
          catID
          name
          pic
          fishes
          type
          catSprite
          availableAccessories
          equippedAccessories
          createdAt
          updatedAt
          userCatId
          __typename
        }
        createdAt
        updatedAt
        userFriendsId
        friendCatId
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const songsBySongID = /* GraphQL */ `
  query SongsBySongID(
    $songID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    songsBySongID(
      songID: $songID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        songID
        name
        artist
        spotifyID
        songFrom
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
        songID
        name
        artist
        spotifyID
        songFrom
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
