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
export const createCat = /* GraphQL */ `
  mutation CreateCat(
    $input: CreateCatInput!
    $condition: ModelCatConditionInput
  ) {
    createCat(input: $input, condition: $condition) {
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
export const updateCat = /* GraphQL */ `
  mutation UpdateCat(
    $input: UpdateCatInput!
    $condition: ModelCatConditionInput
  ) {
    updateCat(input: $input, condition: $condition) {
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
export const deleteCat = /* GraphQL */ `
  mutation DeleteCat(
    $input: DeleteCatInput!
    $condition: ModelCatConditionInput
  ) {
    deleteCat(input: $input, condition: $condition) {
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
export const createFriend = /* GraphQL */ `
  mutation CreateFriend(
    $input: CreateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    createFriend(input: $input, condition: $condition) {
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
export const updateFriend = /* GraphQL */ `
  mutation UpdateFriend(
    $input: UpdateFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    updateFriend(input: $input, condition: $condition) {
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
export const deleteFriend = /* GraphQL */ `
  mutation DeleteFriend(
    $input: DeleteFriendInput!
    $condition: ModelFriendConditionInput
  ) {
    deleteFriend(input: $input, condition: $condition) {
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
export const createSong = /* GraphQL */ `
  mutation CreateSong(
    $input: CreateSongInput!
    $condition: ModelSongConditionInput
  ) {
    createSong(input: $input, condition: $condition) {
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
export const updateSong = /* GraphQL */ `
  mutation UpdateSong(
    $input: UpdateSongInput!
    $condition: ModelSongConditionInput
  ) {
    updateSong(input: $input, condition: $condition) {
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
export const deleteSong = /* GraphQL */ `
  mutation DeleteSong(
    $input: DeleteSongInput!
    $condition: ModelSongConditionInput
  ) {
    deleteSong(input: $input, condition: $condition) {
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
