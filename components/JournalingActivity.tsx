import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import { ArrowLeft, Save } from 'lucide-react-native';
import { router } from 'expo-router';

const prompts = [
  'What are you feeling right now?',
  'What made you smile today?',
  'What challenge did you overcome?',
  'What are you grateful for?',
  'What do you want to improve?',
  'What brings you peace?',
];

export default function JournalingActivity() {
  const [journalEntry, setJournalEntry] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const handleTextChange = (text: string) => {
    setJournalEntry(text);
    const words = text.trim().split(/\s+/).filter((w) => w.length > 0);
    setWordCount(words.length);
  };

  const handleSave = () => {
    Keyboard.dismiss();
    if (journalEntry.trim()) {
      setTimeout(() => {
        router.back();
      }, 300);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Journaling</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Express Your Thoughts</Text>
        <Text style={styles.subtitle}>
          Writing is a powerful way to process emotions and gain clarity
        </Text>

        <View style={styles.promptContainer}>
          <Text style={styles.promptLabel}>Today's Prompt</Text>
          <View style={styles.promptBox}>
            <Text style={styles.promptText}>{prompts[selectedPrompt]}</Text>
          </View>
          <TouchableOpacity
            style={styles.nextPromptButton}
            onPress={() => setSelectedPrompt((selectedPrompt + 1) % prompts.length)}>
            <Text style={styles.nextPromptButtonText}>Next Prompt</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.editorContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Start writing here..."
            placeholderTextColor="#64748b"
            multiline
            value={journalEntry}
            onChangeText={handleTextChange}
            textAlignVertical="top"
          />
          <View style={styles.wordCountContainer}>
            <Text style={styles.wordCountText}>{wordCount} words</Text>
          </View>
        </View>

        <View style={styles.guidelineContainer}>
          <Text style={styles.guidelineTitle}>Journaling Tips</Text>
          <Text style={styles.guidelineItem}>
            • Write freely without worrying about grammar
          </Text>
          <Text style={styles.guidelineItem}>
            • Be honest with yourself
          </Text>
          <Text style={styles.guidelineItem}>
            • Let your emotions flow onto the page
          </Text>
          <Text style={styles.guidelineItem}>
            • Use this as your personal safe space
          </Text>
          <Text style={styles.guidelineItem}>
            • Aim for at least 50-100 words
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, !journalEntry.trim() && styles.saveButtonDisabled]}
          onPress={handleSave}
          disabled={!journalEntry.trim()}>
          <Save color="#ffffff" size={20} />
          <Text style={styles.saveButtonText}>Save Entry</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  promptContainer: {
    marginBottom: 24,
  },
  promptLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  promptBox: {
    backgroundColor: '#ec489922',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ec4899',
    marginBottom: 12,
  },
  promptText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ec4899',
    lineHeight: 24,
  },
  nextPromptButton: {
    backgroundColor: '#ec4899',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  nextPromptButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  editorContainer: {
    marginBottom: 24,
  },
  textInput: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    minHeight: 240,
    borderWidth: 2,
    borderColor: '#334155',
    fontFamily: 'System',
  },
  wordCountContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
  },
  wordCountText: {
    fontSize: 12,
    color: '#94a3b8',
  },
  guidelineContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  guidelineTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  guidelineItem: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
    lineHeight: 20,
  },
  saveButton: {
    backgroundColor: '#ec4899',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  saveButtonDisabled: {
    backgroundColor: '#64748b',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
