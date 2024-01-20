import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Button, ImageBackground, TouchableOpacity, Dimensions, Easing, Text, Image } from 'react-native';
const scale = 3;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import Modules from './Modules';
import { Audio } from 'expo-av';
import { generateFriendRequestsList } from './FriendRequestsList';
import { Amplify, Auth } from 'aws-amplify';
import { API, graphqlOperation } from 'aws-amplify'
import { listUsers, getUser, userByName, getFriend, getCat, catByName } from '../src/graphql/queries'
import { Overlay } from 'react-native-elements';
import Loading from './Loading';

const totalSpriteSheetNum = 5;

const spriteSheet0 = require('../assets/black_0.png');
const spriteSheet1 = require('../assets/blue_0.png');
const spriteSheet2 = require('../assets/brown_0.png');
const spriteSheet3 = require('../assets/calico_0.png');
const spriteSheet4 = require('../assets/grey_0.png');
const outfit_christmasHat = require('../assets/christmasHatForCat.png');
const wife = require('../assets/wife.jpg');
const directions = [
  { x: 0, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: 0 },
  { x: -1, y: -1 },
  { x: 0, y: -1 },
  { x: 1, y: -1 },
  { x: 1, y: 0 },
  { x: 1, y: 1 },
];


const imagetemp = [
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/e/ee/NewJeans_-_Get_Up.png",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/3/3d/New_Jeans_%28EP%29.jpg",
];
const artists = ["New Jeans", "abcdefghigklmnopqrstuvwxyz", "patrick", "addy ", "hajin", "albert", "random name", "long nameeeeeeeeeee", "micahel", "miguel", "tofulati", "jhba;sdf", "kajsbdjasd", "qphnda", "kjbasdubhkjqwn"];
const songNames = [true, false, true, true, false, true, true, false, true, true, false, true];

var user = {};

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
    require('../assets/mewsound.mp3')
  );

  await sound.playAsync();
}

export async function getUserCat(){
  const currentUserInfo = await Auth.currentUserInfo();
  const currentUser = currentUserInfo.username;

  const currUserParams = {
    name: currentUser
    };
  const userCatResult = await API.graphql(graphqlOperation(catByName, currUserParams));
  const userCatName = userCatResult.data.catByName.items[0].name;
  const userCatType = userCatResult.data.catByName.items[0].type;
  const userCatFishes = userCatResult.data.catByName.items[0].fishes;
  console.log("user cat name: " + userCatName);
  console.log("user cat fishes: " + userCatFishes);

  user = {
    name: userCatName,
    type: userCatType,
    fishes: userCatFishes,
  }

}

const Cat = ({ onMoveEnd, setIsModalVisible, friend, setModalContent }) => {
  const scale = 3;
  const speed = 100;
  const frameWidth = 32;
  const frameHeight = 32;
  const frameDuration = 150;

  const [lastDirectionIndex, setLastDirectionIndex] = useState(0);
  const [directionIndexs, setdirectionIndexs] = useState(0);
  const [spriteStartX, setSpriteStartX] = useState(384);
  const [spriteStartY, setSpriteStartY] = useState(32);
  const [frameCount, setFrameCount] = useState(4);
  const [isMoving, setIsMoving] = useState(false);


  let directionIndex = 0;

  const x = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(0)).current;
  const position = useRef({ x: 0, y: 0 }).current;

  const movingStartX = 384;
  const sittingStartX = 0;
  const sittingStartY = 32;
  const sittingFrameCount = 6


  const spriteSheets = [spriteSheet0, spriteSheet1, spriteSheet2, spriteSheet3, spriteSheet4];
  const [spriteSheetSource, setSpriteSheetSource] = useState(spriteSheets[Math.floor(Math.random() * spriteSheets.length)]);


  const handlePressCat = () => {
    playSound();
    setModalContent(friend);
    setIsModalVisible(true);
    stopAnimationAndListeners();

    //this part of animation is making them sit down
    setSpriteStartX(32);
    setSpriteStartY(64 + lastDirectionIndex * 64);
    setFrameCount(1);
    setIsMoving(false);

    const pauseDuration = Math.random() * 2000 + sittingFrameCount * frameDuration + 1000;
    timeoutId.current = setTimeout(moveToNewPosition, pauseDuration);
  };

  const stopAnimationAndListeners = () => {
    x.stopAnimation();
    y.stopAnimation();
    clearTimeout(timeoutId.current);

  };

  const moveToNewPosition = () => {

    setIsMoving(true);
    setFrameCount(4);
    setSpriteStartX(384);
    stopAnimationAndListeners();


    directionIndex = Math.floor(Math.random() * 8);
    let maxDistance, distance;
    const minTravelDistance = 50;
    const halfScreenWidth = screenWidth / 2;
    const halfScreenHeight = screenHeight / 2;


    let validDirection = false;
    while (!validDirection) {
      const direction = directions[directionIndex];
      let maxDistanceX;
      let maxDistanceY;


      if (direction.x !== 0) {
        maxDistanceX = direction.x > 0 ? (halfScreenWidth - position.x - frameWidth * scale / 2) : (halfScreenWidth + position.x - frameWidth * scale / 2);
      } else {
        maxDistanceX = Infinity;
      }

      if (direction.y !== 0) {
        maxDistanceY = direction.y > 0 ? (halfScreenHeight - position.y - frameHeight * scale / 2) : (halfScreenHeight + position.y - frameHeight * scale / 2);
      } else {
        maxDistanceY = Infinity;
      }

      maxDistance = Math.min(maxDistanceX, maxDistanceY);
      if (direction.x !== 0 && direction.y !== 0) {
        // Adjust for diagonal movement
        maxDistance = maxDistance / Math.sqrt(2);
      }

      if (maxDistance >= minTravelDistance) {
        validDirection = true;
      } else {
        directionIndex = (directionIndex + 1) % 8;
      }
    }

    const chosenDirection = directions[directionIndex];
    setdirectionIndexs(directionIndex);
    setSpriteStartY(32 + directionIndex * 64);
    distance = minTravelDistance + Math.random() * (maxDistance - minTravelDistance);
    setLastDirectionIndex(directionIndex);
    const newx = position.x + chosenDirection.x * distance;
    const newy = position.y + chosenDirection.y * distance;
    const duration = (distance / speed) * 1000;

    position.x = newx;
    position.y = newy;

    Animated.parallel([
      Animated.timing(x, { toValue: newx, duration, useNativeDriver: true, easing: Easing.linear }),
      Animated.timing(y, { toValue: newy, duration, useNativeDriver: true, easing: Easing.linear }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsMoving(false);
            //this part of animation is making them sit down
        setSpriteStartX(0);
        setSpriteStartY(32 + directionIndex * 64);
        setFrameCount(6);

        const pauseDuration = Math.random() * 2000 + sittingFrameCount * frameDuration + 1000;
        timeoutId.current = setTimeout(moveToNewPosition, pauseDuration);
        timeoutId.current = setTimeout(stopAnimationFrame, (sittingFrameCount - 1) * frameDuration);

      }
      onMoveEnd?.();
    });
  };

  const stopAnimationFrame = () => {
    setSpriteStartX(32);
    setSpriteStartY(64 + directionIndex * 64);
    setFrameCount(1);
  }

  const timeoutId = useRef(null);

  useEffect(() => {
    moveToNewPosition();

    return () => {
      stopAnimationAndListeners();
    };
  }, []);

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: x },
          { translateY: y },
        ],
      }}
    >
      <TouchableOpacity onPress={handlePressCat}>
      <View >
    <SpriteAnimator
      // style={{ position: 'absolute' }}
      source={spriteSheetSource}
      frameCount={frameCount}
      frameDuration={frameDuration}
      startX={spriteStartX}
      startY={spriteStartY}
      frameWidth={frameWidth}
      frameHeight={frameHeight}
      directionIndexs={directionIndexs}
    />
    <View style={{ marginTop : frameHeight * scale * -1 }}>
    <SpriteAnimator
      source={outfit_christmasHat}
      frameCount={frameCount}
      frameDuration={frameDuration}
      startX={spriteStartX}
      startY={spriteStartY}
      frameWidth={frameWidth}
      frameHeight={frameHeight}
      directionIndexs={directionIndexs}
    />
    </View>
  </View>
</TouchableOpacity>

    </Animated.View>
  );
};

export async function generateFriendsList() {
  try {
    // const [friends, setFriends] = useState([]);
    // const [friendsLength, setFriendsLength] = useState();
    console.log("beginning of friends list function!");
    const currentUserInfo = await Auth.currentUserInfo();
    const currentUser = currentUserInfo.username;

    const params = {
      name: currentUser
    };
    const userRes = await API.graphql(graphqlOperation(userByName, params));
    const userID = userRes.data.userByName.items[0].id;
    const result = await API.graphql({
      query: getFriend,
      variables: { id: userID }
    });
    // setFriends(result.data.userByName.items[0].friends);

    const friends = userRes.data.userByName.items[0].friends;
    console.log("Friends in friends list " + friends);
    // setFriendsLength(friends.length);
    const friendsLength = friends.items.length;
    console.log(friends.items[0].cat.name)

    console.log("Friends length: " + friendsLength);
    if (friendsLength == undefined) {
      friendsLength = 0;
    }
    console.log("generate friends list done!");
    friendsData = Array.from({ length: friendsLength }, (_, num) => ({
      profilePicture: imagetemp[num],
      name: friends.items[num].cat.name,
      type: friends.items[num].cat.type,
    }));
    return friendsData;
  } catch (err) {
    console.log("Failed to get friend in grayscreen" + err);
    return [];
  }
}

const SpriteAnimator = ({ source, frameCount, frameDuration, startX, startY, frameWidth, frameHeight, directionIndexs }) => {
  const animation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    animation.setValue(0);
  }, [startX, startY]);

  const inputRange = Array.from({ length: frameCount }, (_, i) => i);
  const translateXOutputRange = inputRange.map(index => -(startX + (index % 4) * frameWidth));
  const translateYOutputRange = inputRange.map(index => -(startY + Math.floor(index / 4) * frameHeight));

  useEffect(() => {
    let currentFrame = 0;
    if (frameCount > 1) {
      const frameUpdateInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % frameCount;
        animation.setValue(currentFrame);
      }, frameDuration);
      return () => clearInterval(frameUpdateInterval);
    } else {
      animation.setValue(frameCount - 1);
    }

  }, [animation, frameCount, frameDuration]);


  const adjustedInputRange = frameCount > 1 ? inputRange : [0, 1];

  const adjustedTranslateXOutputRange = frameCount > 1 ? translateXOutputRange : [translateXOutputRange[0], translateXOutputRange[0]];
  const adjustedTranslateYOutputRange = frameCount > 1 ? translateYOutputRange : [translateYOutputRange[0], translateYOutputRange[0]];


  const frameStyle = {
    height: frameHeight * scale,
    width: frameWidth * scale,

    overflow: 'hidden',
  };

  const imageStyle = {
    width: 1024 * scale,
    height: 544 * scale,
    position: 'absolute',
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: adjustedInputRange,
          outputRange: adjustedTranslateXOutputRange.map(value => value * scale),
          extrapolate: 'clamp'
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange: adjustedInputRange,
          outputRange: adjustedTranslateYOutputRange.map(value => value * scale),
          extrapolate: 'clamp'
        }),
      },
    ],
  };

  return (
    <Animated.View style={frameStyle}>
      <Animated.Image source={source} style={imageStyle} />
    </Animated.View>
  );
};

export default function GrayScreen({ navigation }) {
  const [touches, setTouches] = useState([]);
  const [friends, setFriends] = useState([]);
  const [modalContent, setModalContent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const spriteSheetSource = require('../assets/black_0.png');
  const [loadVisible, setLoadVisible] = useState(false);

  const toggleLoad = () => {
    setLoadVisible(!loadVisible);
}

const toggleLoadFalse = () => {
    setLoadVisible(loadVisible);
}

  useEffect(() => {
    const fetchFriends = async () => {
      const friendsData = await generateFriendsList();
      await getUserCat();
      setFriends(friendsData);
    };
    fetchFriends();
    generateFriendRequestsList();
  }, []);

  const CatInfoModal = ({ visible, onClose, friend }) => {
    if (!visible || !friend) return null;
    
    return (
      <TouchableOpacity
        style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.modalContent}>
          <Image source={{ uri: friend.profilePicture }} style={styles.friendImage} />
          <View style={styles.friendMoreInfo}>
            <Text style={styles.friendName}>{friend.name}</Text>

            <View style={styles.horizontalLine} />
            <Text>Type: {friend.type}</Text>
            <Text>Fishes: {friend.fishes}</Text>
            <Text>Listening to:</Text>

          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <ImageBackground
      source={require('../assets/catbackground.jpg')}
      style={styles.container}
    >
      <View style={styles.modulesContainer}>
        <Modules />
      </View>
      <View style={styles.catsContainer}>
      <Overlay isVisible={loadVisible} onBackdropPress={toggleLoad} overlayStyle={{ backgroundColor: '#f0d396', height: '50%', width: '50%', borderRadius: 20 }}>
                <Loading />
            </Overlay>
        <Cat
            friend={user}
            setIsModalVisible={async () => {
              toggleLoad();
              await getUserCat();
              toggleLoadFalse();
              setIsModalVisible(!isModalVisible);
            }}
            setModalContent={setModalContent}
            onMoveEnd={() => {/* ... */ }}
          />
      </View>
      <View style={styles.catsContainer}>
        {friends.map((friend, index) => (
          <Cat
            key={index}
            friend={friend}
            setIsModalVisible={setIsModalVisible}
            setModalContent={setModalContent}
            onMoveEnd={() => {/* ... */ }}
          />
        ))}
      </View>
      <CatInfoModal visible={isModalVisible} friend={modalContent} onClose={() => setIsModalVisible(false)} />
      {/* <Button onPress={getSantaHat}> asd</Button> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  catsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2
  },
  modalContent: {
    backgroundColor: '#f0d396',
    borderWidth: 3,
    borderColor: '#783621',
    padding: 20,
    borderRadius: 10,
    width: "60%",
    height: "40%",
  },
  friendMoreInfo: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    width: '95%',
    height: '80%',
    padding: 10,
  },
  horizontalLine: {
    borderBottomColor: '#783621',
    borderBottomWidth: 1,
    marginHorizontal: 5,
    marginBottom: 5,
  },
  friendImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  friendName: {
    fontSize: 20,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchCircle: {
    position: 'absolute',
    width: 40,
    height: 36,
    resizeMode: 'cover',
  },
  spriteContainer: {
    width: 32 * scale,
    height: 32 * scale,
    overflow: 'hidden',
  },
  cat: {
    width: 32 * scale,
    height: 32 * scale,
    overflow: 'hidden',
  },
  modulesContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
  },
});





