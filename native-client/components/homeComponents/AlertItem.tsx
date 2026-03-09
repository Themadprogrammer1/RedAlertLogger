import React from 'react';
import { View, Text } from 'react-native';
import { AlertData } from '@/interfaces/alert';
import { styles } from '@/styles/homeStyles';

interface Props {
    item: AlertData;
}

// Defining it as a separate functional component
export const AlertItem = ({ item }: Props) => (
    <View style={styles.alertCard}>
        <View style={styles.alertIconPlaceholder}>
            <Text style={styles.alertIconText}>!</Text>
        </View>
        <View style={styles.alertDetails}>
            <Text style={styles.alertLocation}>{item.location}</Text>
            <Text style={styles.alertType}>{item.type}</Text>
            <Text style={styles.alertTime}>
                {item.date} • {item.time}
            </Text>
        </View>
    </View>
);
