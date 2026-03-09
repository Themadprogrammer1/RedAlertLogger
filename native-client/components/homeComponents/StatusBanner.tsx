import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '@/styles/homeStyles';

export const StatusBanner = () => (
    <View style={styles.statusBanner}>
        <Text style={styles.statusText}>התרעות אחרונות</Text>
    </View>
);
