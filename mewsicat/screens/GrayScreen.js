import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Animated, Button, ImageBackground, TouchableOpacity, Dimensions, Easing } from 'react-native';
const scale = 3;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');


const Cat = ({ source, onMoveEnd }) => {
  const scale = 3;
  const speed = 100; // pixels per second
  const frameWidth = 32;
  const frameHeight = 32;
  const frameDuration = 150;
  const [spriteStartY, setSpriteStartY] = useState(32); // Initial startX for sprite animation


  // Position state
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  // Random destination point
  const getRandomPoint = () => ({
    x: (Math.random()-0.5) * (screenWidth - frameWidth * scale),
    y: (Math.random()-0.5) * (screenHeight - frameHeight * scale),
  });

  const moveToNewPosition = () => {
    const newPoint = getRandomPoint();
    const xDistance = newPoint.x - translateX._value;
    const yDistance = newPoint.y - translateY._value;
  
    // Calculate the angle in radians and normalize it to a 0-360 range
    let angle = Math.atan2(yDistance, xDistance) * (180 / Math.PI);
    if (angle < 0) {
      angle += 360;
    }
  
    // Map the angle to one of the 8 directions (0 to 7)
    const directionIndex = Math.round(angle / 45) % 8;
    
    // Update startY to change the animation based on direction
    setSpriteStartY(32 + directionIndex * 64); // Assuming each direction's animation frames are 64 pixels apart on the Y axis
  
    // Calculate the direction vector for the sprite based on the directionIndex
    const directionVector = {
      x: Math.cos(directionIndex * Math.PI / 4),
      y: Math.sin(directionIndex * Math.PI / 4)
    };
  
    // Calculate the distance the sprite should actually move
    const moveX = directionVector.x * Math.sign(xDistance) * Math.min(Math.abs(xDistance), Math.abs(yDistance));
    const moveY = directionVector.y * Math.sign(yDistance) * Math.min(Math.abs(xDistance), Math.abs(yDistance));
  
    const distance = Math.sqrt(moveX ** 2 + moveY ** 2);
    let duration = (distance / speed) * 1000; // Convert speed to duration
  
    // Start the animations with no easing
    Animated.timing(translateX, {
      toValue: translateX._value + moveX,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear // Linear movement
    }).start();
  
    Animated.timing(translateY, {
      toValue: translateY._value + moveY,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear // Linear movement
    }).start(({ finished }) => {
      // Callback when animation is finished
      if (finished) {
        onMoveEnd && onMoveEnd();
        // Wait for a random amount of time before moving again
        timeoutId.current = setTimeout(moveToNewPosition, Math.random() * 5000); // Random delay between 0 to 5 seconds
      }
    });
  };
  

  const timeoutId = useRef(null);

  useEffect(() => {
    // Start moving when the component mounts
    moveToNewPosition();

    // Cleanup function to clear the timeout when the component unmounts
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, []);
  

  return (
    <Animated.View
      style={{
        transform: [
          { translateX: translateX },
          { translateY: translateY },
        ],
      }}
    >
      <TouchableOpacity onPress={moveToNewPosition}>
      <SpriteAnimator
  source={source}
  frameCount={4}
  frameDuration={frameDuration}
  startX={384} // Use state variable here
  startY={spriteStartY}
  frameWidth={frameWidth}
  frameHeight={frameHeight}
/>

      </TouchableOpacity>
    </Animated.View>
  );
};

const SpriteAnimator = ({ source, frameCount, frameDuration, startX, startY, frameWidth, frameHeight, position }) => {
  const animation = useState(new Animated.Value(0))[0];
  const inputRange = Array.from({ length: frameCount }, (_, i) => i);
  const translateXOutputRange = inputRange.map(index => -(startX + (index % 4) * frameWidth));
  const translateYOutputRange = inputRange.map(index => -(startY + Math.floor(index / 4) * frameHeight));

  useEffect(() => {
    let currentFrame = 0;
    const frameUpdateInterval = setInterval(() => {
      currentFrame = currentFrame >= frameCount - 1 ? 0 : currentFrame + 1;
      animation.setValue(currentFrame);
    }, frameDuration);
    return () => clearInterval(frameUpdateInterval);
  }, [animation, frameCount, frameDuration]);

  const frameStyle = {
    height: frameHeight * scale,
    width: frameWidth * scale,
    overflow:'hidden',
  };

  const imageStyle = {
    width: 1024 * scale,
    height: 544 * scale,
    position: 'absolute',
    transform: [
      {
        translateX: animation.interpolate({
          inputRange,
          outputRange: translateXOutputRange.map(value => value * scale),
          extrapolate: 'clamp'
        }),
      },
      {
        translateY: animation.interpolate({
          inputRange,
          outputRange: translateYOutputRange.map(value => value * scale),
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
      <View style={styles.container}>
      <Cat
        source={spriteSheetSource}
        onMoveEnd={() => {
          console.log('dest');
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
    width: 32 * scale, // Scale up the frame width
    height: 32 * scale, // Scale up the frame height
    overflow: 'hidden',

    // Add other styles if necessary
  },
});