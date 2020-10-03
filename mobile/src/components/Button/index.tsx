import React from 'react';
import { GestureResponderEvent } from 'react-native';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme';

interface Props {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  kind?: string;
  style?: any;
}

export default ({
  label,
  onPress = () => {},
  kind = 'default',
  style = { button: {}, label: {} },
}: Props) => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      width: '100%',
      height: 50,
      borderRadius: 5,
      ...KINDS.button[kind],
      ...style.button,
    },
    label: {
      ...KINDS.label[kind],
      ...style.label,
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const KINDS: any = {
  button: {
    primary: {
      backgroundColor: colors.primary,
    },
    default: {
      backgroundColor: colors.ground,
    },
  },
  label: {
    primary: {
      color: '#fff',
    },
  },
};
