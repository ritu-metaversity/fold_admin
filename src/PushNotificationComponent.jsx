// src/PushNotification.js

import React, { useState, useEffect } from 'react';
import { server } from './server';

const PushNotification = () => {
    const [isSubscribed, setIsSubscribed] = useState(false);

    useEffect(() => {
        
        const checkSubscription = async () => {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(!!subscription);
        };
        checkSubscription();
    }, []);

    const askNotificationPermission = async () => {
        const permission = await window.Notification.requestPermission();
        if (permission === 'granted') {
            console.log('Notification permission granted.');
            subscribeUserToPush();
        } else {
            console.log('Notification permission denied.');
        }
    };

    const subscribeUserToPush = async () => {
        console.log(navigator, "hellooo")
        const registration = await navigator.serviceWorker.ready;

        console.log("registration", registration)

        const publicKey = 'BEXMsi1IFb-C-ATCnqTkZFI52AmAkl95gD5D0OgyqrhHRYN8crxXJDrlc7Q1m5qRDHUvCvgC9h2Q3zQtQleSoQ0'; 
        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicKey),
        });

        console.log('User is subscribed:', subscription);
       
        
        if(subscription){
            setIsSubscribed(true);
            server.subscribe(JSON.parse(JSON.stringify(subscription)));
        }
    };

    const urlBase64ToUint8Array = (base64String) => {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);
        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    };

    return (
        <div>
            <h1>Push Notifications</h1>
            <button onClick={askNotificationPermission} disabled={isSubscribed}>
                {isSubscribed ? 'Notifications Enabled' : 'Enable Notifications'}
            </button>
        </div>
    );
};

export default PushNotification;
