// src/utils/notification.js

// دالة لإرسال إشعار للمتصفح
export function sendNotification(title, body) {
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, { body });
  }
}
