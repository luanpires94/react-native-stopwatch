import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [time, setTime] = useState(0);
  const [textBtn, setTextBtn] = useState('start');
  const [lastTime, setLastTime] = useState(null);

  const image = require('./assets/crono.png')

  const start = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
      setTextBtn('start')
    } else {
      timer = setInterval(() => {
        ss++;

        if (ss == 60) {
          ss = 0;
          mm++;
        }

        if (mm == 60) {
          mm = 0;
          hh++;
        }

        let format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);

        setTime(format);

      }, 100);
      setTextBtn('stop');
    }
  }

  const restart = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }

    setLastTime(time);
    setTime(0);
    ss = 0;
    mm = 0;
    hh = 0;
    setTextBtn('start');
  }

  return (
    <View style={styles.container}>

      <ImageBackground
        source={image}
        alt="stopwatch"
        style={styles.image}
        resizeMode="contain"
      >
        <Text style={styles.text}>{time}</Text>
      </ImageBackground>

      <View style={styles.boxButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={start}
        >
          <Text style={styles.boxButtonsText}>{textBtn}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={restart}
        >
          <Text style={styles.boxButtonsText}>RESTART</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.lastTime}>
        <Text style={styles.lastTimeText}>
          {lastTime ? `Last time: ${lastTime}` : ''}
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300
  },
  text: {
    flex: 1,
    fontSize: 35,
    alignSelf: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    marginTop: 40
  },
  boxButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  boxButtonsText: {
    color: '#00aeef',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 9,
    marginRight: 10,
    width: 100,
  },
  lastTime: {
    marginTop: 40,
  },
  lastTimeText: {
    fontSize: 23,
    color: '#fff'
  }

});
