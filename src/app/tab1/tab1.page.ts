import { Component } from '@angular/core';
import {
  LocalNotifications,
  PermissionStatus,
  ScheduleOptions,
} from '@capacitor/local-notifications';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor() {}

  async requestPermission() {
    try {
      // request permission for sending notifications
      const result: PermissionStatus =
        await LocalNotifications.requestPermissions();
      console.log('Permission status:', result);
      if (result.display != 'granted') {
        console.log('Permission not granted!');
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  }

  async scheduleNotification(seconds: number) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'New Notification',
            body: 'This is a test',
            schedule: {
              at: new Date(
                // get current time
                new Date().getTime() +
                  // add 3 seconds
                  seconds * 1000
              ),
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }
}
