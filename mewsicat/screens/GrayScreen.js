import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Button, ImageBackground, TouchableOpacity, Dimensions, Easing } from 'react-native';
const scale = 3;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
import Modules from './Modules';
import { Audio } from 'expo-av';

async function playSound() {
  const { sound } = await Audio.Sound.createAsync(
     require('../assets/mewsound.mp3')
  );

  await sound.playAsync();
}


const Cat = ({ source, onMoveEnd }) => {
  const scale = 3;
  const speed = 100;
  const frameWidth = 32;
  const frameHeight = 32;
  const frameDuration = 150;

  const [lastDirectionIndex, setLastDirectionIndex] = useState(0);
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

  const handlePressCat = () => {
    playSound();
    stopAnimationAndListeners();

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
  
    let validDirection = false;
    while (!validDirection) {
      const direction = directions[directionIndex];
      let maxDistanceX;
      let maxDistanceY;
      
  
      if (direction.x !== 0) {
        maxDistanceX = direction.x > 0 ? (halfScreenWidth - position.x- frameWidth*scale/2) : (halfScreenWidth + position.x-frameWidth*scale/2);
      } else {
        maxDistanceX = Infinity;
      }
  
      if (direction.y !== 0) {
        maxDistanceY = direction.y > 0 ? (halfScreenHeight - position.y-frameHeight*scale/2) : (halfScreenHeight + position.y - frameHeight*scale/2);
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
        setSpriteStartX(0);
        setSpriteStartY(32+directionIndex*64);
        setFrameCount(6); 

        const pauseDuration = Math.random() * 2000+sittingFrameCount*frameDuration+1000;
        timeoutId.current = setTimeout(moveToNewPosition, pauseDuration);
        timeoutId.current = setTimeout(stopAnimationFrame, (sittingFrameCount-1)*frameDuration);

      }
      onMoveEnd?.();
    });
  };
  
  const stopAnimationFrame = () =>{
      setSpriteStartX(32); 
      setSpriteStartY(64+directionIndex*64);
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
        <SpriteAnimator
          source={source}
          frameCount={frameCount}
          frameDuration={frameDuration}
          startX={spriteStartX}
          startY={spriteStartY}
          frameWidth={frameWidth}
          frameHeight={frameHeight}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};


const SpriteAnimator = ({ source, frameCount, frameDuration, startX, startY, frameWidth, frameHeight }) => {
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
  const spriteSheetSource = require('../assets/black_0.png');

  return (
    <ImageBackground
      source={require('../assets/catbackground.png')}
      style={styles.container}
    >
      <View style={styles.modulesContainer}>
    <Modules/>
  </View>
      <View style={styles.container}>
        <Cat
          source={spriteSheetSource}
          onMoveEnd={() => {
            // console.log('dest');
          }}
        />
      </View>
      <View>
        <Button
          onPress={() => navigation.navigate('Home')}
          title="Press Me"
        />
      </View>
      {touches.map((touch, index) => (
        <Animated.Image
          key={index}
          source={require('../assets/catpaw.png')}
          style={[
            styles.touchCircle,
            {
              top: touch.y - 30,
              left: touch.x,
              opacity: touch.opacity,
              transform: [{ scale: touch.scale }],
            },
          ]}
        />
      ))}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
    position: 'absolute', // Take Modules out of the normal flow and position it over other content
    top: 0, // Position at the top of the parent container
    left: 0, // Position at the left of the parent container
    right: 0, // Ensuring it's stretched across the parent container
    zIndex: 1, // Makes sure Modules appears on top of other components
  },
});