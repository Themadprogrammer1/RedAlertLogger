import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/styles/homeStyles';

export const Header = () => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>פיקוד העורף</Text>
        <Text style={styles.headerSubtitle}>Home Front Command</Text>
    </View>
);
