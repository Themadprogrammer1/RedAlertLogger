import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItemInfo } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import { styles } from '@/styles/homeStyles';
import { AlertData } from '@/interfaces/alert';
import { FAKE_ALERTS } from '@/constants/mockData';
import { Header } from '@/components/homeComponents/Header';
import { StatusBanner } from '@/components/homeComponents/StatusBanner';
import { AlertItem } from '@/components/homeComponents/AlertItem';

/**
 * Configure how notifications behave when the app is actively open in the foreground.
 * Without this, notifications received while the app is open are silently ignored.
 */
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, // Display the notification pop-up
        shouldPlaySound: true, // Play the device default notification sound
        shouldSetBadge: false, // Don't update the app icon badge count
        shouldShowBanner: true, // Show the banner at the top of the screen
        shouldShowList: true, // Keep it in the notification center list
    }),
});

export default function HomeScreen() {
    // State to hold the list of alerts. Initialized with our fake database data.
    const [alerts, setAlerts] = useState<AlertData[]>(FAKE_ALERTS);

    /**
     * useEffect runs once when the HomeScreen component first loads.
     * It handles requesting notification permissions and scheduling the recurring alert.
     */
    useEffect(() => {
        async function setupNotifications() {
            // 1. Check current notification permission status
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            // 2. If we don't have permission yet, ask the user for it
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            // 3. If the user denied permission, stop execution here
            if (finalStatus !== 'granted') {
                console.log('Failed to get push token for push notification!');
                return;
            }

            //! --- replace this later with registering for real push notifications ---
            // 4. Clear any old notifications so we don't accidentally create duplicates
            await Notifications.cancelAllScheduledNotificationsAsync();

            // 5. Schedule a new recurring local notification
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: '🔴 צבע אדום / Red Alert',
                    body: 'התרעה הופעלה באזורך (Fake Alert)',
                    sound: true,
                },
                trigger: {
                    type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
                    seconds: 10, // Fires every 10 seconds (for testing purposes)
                    repeats: true, // Keeps repeating automatically
                },
            });
        }

        // Execute the async function we just defined
        setupNotifications();

        /**
         * The return function acts as a cleanup mechanism.
         * If the user leaves this screen or the component unmounts,
         * it clears the scheduled notifications so it stops spamming the device.
         */
        return () => {
            Notifications.cancelAllScheduledNotificationsAsync();
        };
    }, []); // Empty dependency array means this only runs once on mount

    // --- MAIN UI RENDER ---
    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <StatusBanner />

            <FlatList
                data={alerts}
                keyExtractor={(item: AlertData) => item.id}
                renderItem={({ item }: ListRenderItemInfo<AlertData>) => <AlertItem item={item} />}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
}
