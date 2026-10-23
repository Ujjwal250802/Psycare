import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { ArrowLeft, Square } from 'lucide-react-native';
import { router } from 'expo-router';

const colors = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#06b6d4',
  '#3b82f6',
  '#8b5cf6',
  '#ec4899',
  '#000000',
  '#ffffff',
];

const patterns = [
  {
    id: 1,
    name: 'Mandalas',
    description: 'Create beautiful circular patterns',
  },
  {
    id: 2,
    name: 'Zentangles',
    description: 'Abstract, meditative designs',
  },
  {
    id: 3,
    name: 'Landscapes',
    description: 'Draw peaceful nature scenes',
  },
  {
    id: 4,
    name: 'Abstract',
    description: 'Express yourself freely',
  },
];

export default function ArtTherapyActivity() {
  const [selectedColor, setSelectedColor] = useState(colors[5]);
  const [selectedPattern, setSelectedPattern] = useState(1);
  const [strokeCount, setStrokeCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft color="#ffffff" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Art Therapy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Creative Expression & Healing</Text>
        <Text style={styles.subtitle}>
          Use art to express your emotions and find inner peace
        </Text>

        <View style={styles.canvasContainer}>
          <View style={styles.canvas}>
            <Square color={selectedColor} size={120} strokeWidth={2} />
            <Text style={styles.canvasText}>Drawing Canvas</Text>
            <Text style={styles.strokeCount}>Strokes: {strokeCount}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.drawButton}
          onPress={() => setStrokeCount(strokeCount + 1)}>
          <Text style={styles.drawButtonText}>Add Stroke</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose a Pattern</Text>
          {patterns.map((pattern) => (
            <TouchableOpacity
              key={pattern.id}
              style={[
                styles.patternItem,
                selectedPattern === pattern.id && styles.patternItemActive,
              ]}
              onPress={() => setSelectedPattern(pattern.id)}>
              <View>
                <Text style={styles.patternName}>{pattern.name}</Text>
                <Text style={styles.patternDescription}>
                  {pattern.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Colors</Text>
          <View style={styles.colorPalette}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorOption,
                  {
                    backgroundColor: color,
                    borderWidth: selectedColor === color ? 3 : 0,
                    borderColor: '#ffffff',
                  },
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Art Therapy Tips</Text>
          <Text style={styles.tipItem}>
            • Don't worry about perfection - focus on the process
          </Text>
          <Text style={styles.tipItem}>
            • Let your emotions guide your choices
          </Text>
          <Text style={styles.tipItem}>
            • Experiment with different colors and patterns
          </Text>
          <Text style={styles.tipItem}>
            • Take breaks and reflect on your creation
          </Text>
          <Text style={styles.tipItem}>
            • Use art to express what words cannot
          </Text>
        </View>

        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => router.back()}>
          <Text style={styles.completeButtonText}>Complete Session</Text>
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
  canvasContainer: {
    marginBottom: 24,
  },
  canvas: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 240,
    borderWidth: 2,
    borderColor: '#334155',
    borderStyle: 'dashed',
  },
  canvasText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
  },
  strokeCount: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },
  drawButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 24,
  },
  drawButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 16,
  },
  patternItem: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  patternItemActive: {
    borderColor: '#f59e0b',
    backgroundColor: '#33280a',
  },
  patternName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  patternDescription: {
    fontSize: 13,
    color: '#94a3b8',
  },
  colorPalette: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 8,
  },
  tipsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 12,
  },
  tipItem: {
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
