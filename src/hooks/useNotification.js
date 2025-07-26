// hook خاص بالإشعارات (طلب الإذن ودالة إرسال)
import { useEffect } from "react";

export function useNotification() {
  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  // دالة إرسال إشعار
  const sendNotification = (title, body) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  return sendNotification;
}
