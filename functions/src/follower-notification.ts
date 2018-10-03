import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

export const newSubscriberNotification = functions.firestore
    .document("relationships/{relationshipId}")
    .onCreate(async (change, context) => {

        // Get the user ids
        const ids = context.params.relationshipId.split("_");

        const subscriber = ids[0];
        const userId = ids[1];

        // ref to the device collection for the user
        const db = admin.firestore()

        // get the subscriber's info
        const userRef = db.collection('users').doc(subscriber)
        const userInfo = await userRef.get();
        const subscriberName = userInfo.data().displayName;
        
        // Notification content
        const payload = {
            notification: {
                title: 'MobileDev - New Subscriber',
                body: `${subscriberName} is following you!`,
                icon: 'https://goo.gl/Fz9nrQ'
            }
        }

        // get the user's tokens and send notifications        
        const devicesRef = db.collection('devices').where('userId', '==', userId)
        const devices = await devicesRef.get();

        const tokens = [];

        // send a notification to each device token
        devices.forEach(result => {
            const token = result.data().token;

            tokens.push(token)
        })

        return admin.messaging().sendToDevice(tokens, payload)

    });