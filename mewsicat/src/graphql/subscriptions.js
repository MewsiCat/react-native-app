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
export const onCreateCat = /* GraphQL */ `
  subscription OnCreateCat($filter: ModelSubscriptionCatFilterInput) {
    onCreateCat(filter: $filter) {
      id
      catID
      name
      pic
      fishes
      type
      createdAt
      updatedAt
      userCatId
      __typename
    }
  }
`;
export const onUpdateCat = /* GraphQL */ `
  subscription OnUpdateCat($filter: ModelSubscriptionCatFilterInput) {
    onUpdateCat(filter: $filter) {
      id
      catID
      name
      pic
      fishes
      type
      createdAt
      updatedAt
      userCatId
      __typename
    }
  }
`;
export const onDeleteCat = /* GraphQL */ `
  subscription OnDeleteCat($filter: ModelSubscriptionCatFilterInput) {
    onDeleteCat(filter: $filter) {
      id
      catID
      name
      pic
      fishes
      type
      createdAt
      updatedAt
      userCatId
      __typename
    }
  }
`;
export const onCreateFriend = /* GraphQL */ `
  subscription OnCreateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onCreateFriend(filter: $filter) {
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
export const onUpdateFriend = /* GraphQL */ `
  subscription OnUpdateFriend($filter: ModelSubscriptionFriendFilterInput) {
    onUpdateFriend(filter: $filter) {
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
export const onDeleteFriend = /* GraphQL */ `
  subscription OnDeleteFriend($filter: ModelSubscriptionFriendFilterInput) {
    onDeleteFriend(filter: $filter) {
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
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong($filter: ModelSubscriptionSongFilterInput) {
    onCreateSong(filter: $filter) {
      id
      songID
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
      songID
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
      songID
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
