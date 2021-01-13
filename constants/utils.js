import { AsyncStorage } from "react-native";
import * as Permissions from 'expo-permissions';
import { Notifications } from "expo";

const NOTIFICATION_KEY = "Flashcardsapp:notifications";

export const clearLocalNotification = () => {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
}
  
export const createNotification = () => {
    return {
        title: "Take your quiz",
        body: "👋 don't forget to take your quiz for today",
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
        },
        ios: {
            sound: true
        }
    }
}

export const setLocalNotification = () => {
    AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
        if (data === null) {
            Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                if (status === 'granted') {
                    Notifications.cancelAllScheduledNotificationsAsync();

                    let tomorrow = new Date()
                    tomorrow.setDate(tomorrow.getDate() + 1)
                    tomorrow.setHours(20)
                    tomorrow.setMinutes(0)

                    Notifications.scheduleLocalNotificationAsync(
                        createNotification(),
                        {time: tomorrow,repeat: 'day'}
                    );

                    AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                }
            });
        }
    });
}

export const generateUID = () => 
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);