import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Modal, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useIntl } from 'react-intl';
import { useLanguage } from '../context/LanguageContext';

interface OptionsMenuProps {
  visible: boolean;
  onClose: () => void;
}

export function OptionsMenu({ visible, onClose }: OptionsMenuProps) {
  const intl = useIntl();
  const { locale, setLocale } = useLanguage();
  const slideAnim = useRef(new Animated.Value(Dimensions.get('window').width)).current;
  const [modalVisible, setModalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setModalVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: Dimensions.get('window').width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(false);
      });
    }
  }, [visible, slideAnim]);

  const handleClose = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      onClose();
    });
  }, [slideAnim, onClose]);

  const handleLanguageChange = useCallback(
    (newLocale: 'en' | 'tr') => {
      setLocale(newLocale);
      handleClose();
    },
    [setLocale, handleClose]
  );

  if (!modalVisible && !visible) {
    return null;
  }

  return (
    <Modal visible={modalVisible} transparent animationType="none">
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.container,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.header}>
            <Pressable
              onPress={handleClose}
              style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
            >
              <Ionicons name="arrow-back" size={24} color="white" />
            </Pressable>
            <Text style={styles.title}>{intl.formatMessage({ id: 'options.title' })}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {intl.formatMessage({ id: 'options.language' })}
            </Text>
            <Pressable
              style={[styles.option, locale === 'en' && styles.selectedOption]}
              onPress={() => handleLanguageChange('en')}
            >
              <Text style={styles.optionText}>
                {intl.formatMessage({ id: 'language.english' })}
              </Text>
              {locale === 'en' && <Ionicons name="checkmark" size={20} color="white" />}
            </Pressable>
            <Pressable
              style={[styles.option, locale === 'tr' && styles.selectedOption]}
              onPress={() => handleLanguageChange('tr')}
            >
              <Text style={styles.optionText}>
                {intl.formatMessage({ id: 'language.turkish' })}
              </Text>
              {locale === 'tr' && <Ionicons name="checkmark" size={20} color="white" />}
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#311b6b',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  pressed: {
    opacity: 0.7,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: '#5e0acc',
  },
  selectedOption: {
    backgroundColor: '#4a0599',
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
});
