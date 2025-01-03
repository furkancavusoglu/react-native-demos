import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Modal, Animated, Dimensions } from 'react-native';
import { useIntl } from 'react-intl';
import { useLanguage } from '../context/LanguageContext';
import { IconButton } from './shared/IconButton';
import { Button } from './shared/Button';
import { colors, spacing, typography } from '../constants/theme';

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
            <IconButton name="arrow-back" size={24} color={colors.white} onPress={handleClose} />
            <Text style={styles.title}>{intl.formatMessage({ id: 'options.title' })}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {intl.formatMessage({ id: 'options.language' })}
            </Text>
            <Button
              title={intl.formatMessage({ id: 'language.english' })}
              onPress={() => handleLanguageChange('en')}
              variant={locale === 'en' ? 'primaryDark' : 'primary'}
              style={styles.option}
            />
            <Button
              title={intl.formatMessage({ id: 'language.turkish' })}
              onPress={() => handleLanguageChange('tr')}
              variant={locale === 'tr' ? 'primaryDark' : 'primary'}
              style={styles.option}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.background,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    fontSize: typography.sizes.title,
    fontWeight: typography.weights.bold,
    color: colors.white,
    flex: 1,
  },
  section: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.subtitle,
    color: colors.white,
    marginBottom: spacing.md,
  },
  option: {
    marginBottom: spacing.sm,
  },
});
