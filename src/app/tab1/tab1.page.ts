import { Component } from '@angular/core';
import {
  LocalNotifications,
  PermissionStatus,
  ScheduleEvery,
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

  async timeNotification(seconds: number) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 1,
            title: 'Timed Notification',
            body: 'This notification is scheduled to appear after a delay of 10 seconds.',
            schedule: {
              at: new Date(
                // get current time
                new Date().getTime() +
                  seconds * 1000
              ),
              every: 'second',
              count: 5,
              on: {
                second: 50}
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async scheduleNotification(hour: number, minute: number) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 2,
            title: 'Scheduled Notification',
            body: 'This notification is scheduled to appears at 8AM daily.',
            schedule: {
              at: new Date(
                new Date().setHours(hour, minute, 0, 0)
              ),
              every: 'day',
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }

  async repeatNotification(repeatArg?: boolean) {
    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 3,
            title: 'Repeat Notification',
            body: 'This notification is scheduled to repeat 5 times every 50 seconds.',
            schedule: {
              at: new Date(Date.now() + 50 * 1000),
              every: 'minute',
              repeats: repeatArg,
            },
          },
        ],
      });
    } catch (error) {
      console.error('Error scheduling notification:', error);
    }
  }
}
