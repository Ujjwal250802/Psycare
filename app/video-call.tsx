import { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageCircle,
  Settings,
} from 'lucide-react-native';

export default function VideoCallScreen() {
  const { appointmentId, doctorName } = useLocalSearchParams();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    Alert.alert('End Call', 'Are you sure you want to end this consultation?', [
      { text: 'Continue', style: 'cancel' },
      {
        text: 'End Call',
        style: 'destructive',
        onPress: () => {
          router.replace({
            pathname: '/feedback',
            params: { appointmentId },
          });
        },
      },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Connecting to {doctorName}...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoContainer}>
        <View style={styles.doctorVideo}>
          <Text style={styles.placeholderText}>{doctorName}</Text>
          <Text style={styles.placeholderSubtext}>Mental Health Professional</Text>
        </View>

        <View style={styles.userVideo}>
          <Text style={styles.userVideoText}>You</Text>
        </View>
      </View>

      <View style={styles.infoBar}>
        <Text style={styles.doctorInfo}>{doctorName}</Text>
        <Text style={styles.callDuration}>{formatTime(callDuration)}</Text>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            isMuted ? styles.controlButtonActive : styles.controlButtonInactive,
          ]}
          onPress={() => setIsMuted(!isMuted)}>
          {isMuted ? (
            <MicOff color={isMuted ? '#ef4444' : '#ffffff'} size={24} />
          ) : (
            <Mic color="#ffffff" size={24} />
          )}
          <Text style={styles.controlButtonLabel}>
            {isMuted ? 'Unmute' : 'Mute'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            !isVideoOn ? styles.controlButtonActive : styles.controlButtonInactive,
          ]}
          onPress={() => setIsVideoOn(!isVideoOn)}>
          {isVideoOn ? (
            <Video color="#ffffff" size={24} />
          ) : (
            <VideoOff color="#ef4444" size={24} />
          )}
          <Text style={styles.controlButtonLabel}>
            {isVideoOn ? 'Camera' : 'Camera Off'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonSettings]}
          onPress={() => Alert.alert('Settings', 'Settings menu would appear here')}>
          <Settings color="#ffffff" size={24} />
          <Text style={styles.controlButtonLabel}>Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonChat]}
          onPress={() => Alert.alert('Chat', 'Chat feature coming soon')}>
          <MessageCircle color="#ffffff" size={24} />
          <Text style={styles.controlButtonLabel}>Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.controlButton, styles.controlButtonEnd]}
          onPress={handleEndCall}>
          <PhoneOff color="#ffffff" size={24} />
          <Text style={styles.controlButtonLabel}>End Call</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomInfo}>
        <Text style={styles.bottomInfoText}>
          You are in a secure video consultation. All conversations are private and
          confidential.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e293b',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e293b',
  },
  loadingText: {
    marginTop: 16,
    color: '#ffffff',
    fontSize: 16,
  },
  videoContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  doctorVideo: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f172a',
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
  },
  placeholderSubtext: {
    fontSize: 14,
    color: '#94a3b8',
  },
  userVideo: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  userVideoText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  doctorInfo: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  callDuration: {
    color: '#10b981',
    fontSize: 16,
    fontWeight: '700',
  },
  controlsContainer: {
    backgroundColor: '#0f172a',
    paddingHorizontal: 20,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: 16,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
    paddingVertical: 12,
    borderRadius: 12,
  },
  controlButtonInactive: {
    backgroundColor: '#10b981',
  },
  controlButtonActive: {
    backgroundColor: '#ef4444',
  },
  controlButtonSettings: {
    backgroundColor: '#3b82f6',
  },
  controlButtonChat: {
    backgroundColor: '#8b5cf6',
  },
  controlButtonEnd: {
    backgroundColor: '#dc2626',
    width: '100%',
  },
  controlButtonLabel: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  bottomInfo: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  bottomInfoText: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});
