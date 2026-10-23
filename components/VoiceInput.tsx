import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

import Voice from '@react-native-voice/voice';

import {
  Mic,
  MicOff,
} from 'lucide-react-native';

interface Props {
  onTextReceived: (
    text: string
  ) => void;
}

export default function VoiceInput({
  onTextReceived,
}: Props) {
  const [isListening, setIsListening] =
    useState(false);

  useEffect(() => {
    Voice.onSpeechResults = (
      event: any
    ) => {
      const text =
        event.value?.[0] || '';

      onTextReceived(text);
    };

    return () => {
      Voice.destroy().then(
        Voice.removeAllListeners
      );
    };
  }, []);

  const startListening =
    async () => {
      try {
        setIsListening(true);

        // HINDI + ENGLISH SUPPORT
        await Voice.start(
          'hi-IN'
        );
      } catch (error) {
        console.log(error);
      }
    };

  const stopListening =
    async () => {
      try {
        await Voice.stop();

        setIsListening(false);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <View
      style={styles.container}>
      <TouchableOpacity
        style={styles.micButton}
        onPress={
          isListening
            ? stopListening
            : startListening
        }>
        {isListening ? (
          <MicOff
            color="#ffffff"
            size={24}
          />
        ) : (
          <Mic
            color="#ffffff"
            size={24}
          />
        )}
      </TouchableOpacity>

      <Text style={styles.text}>
        {isListening
          ? 'Listening...'
          : 'Tap to Speak'}
      </Text>
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      alignItems: 'center',
      marginTop: 10,
    },

    micButton: {
      width: 55,
      height: 55,
      borderRadius: 30,
      backgroundColor:
        '#10b981',
      alignItems: 'center',
      justifyContent: 'center',
    },

    text: {
      marginTop: 8,
      color: '#64748b',
      fontSize: 13,
    },
  });