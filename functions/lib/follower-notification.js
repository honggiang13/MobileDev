"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.newSubscriberNotification = functions.firestore
    .document("relationships/{relationshipId}")
    .onCreate((change, context) => __awaiter(this, void 0, void 0, function* () {
    // Get the user ids
    const ids = context.params.relationshipId.split("_");
    const subscriber = ids[0];
    const userId = ids[1];
    // ref to the device collection for the user
    const db = admin.firestore();
    // get the subscriber's info
    const userRef = db.collection('users').doc(subscriber);
    const userInfo = yield userRef.get();
    const subscriberName = userInfo.data().displayName;
    // Notification content
    const payload = {
        notification: {
            title: 'MobileDev - New Subscriber',
            body: `${subscriberName} is following you!`,
            icon: 'https://goo.gl/Fz9nrQ'
        }
    };
    // get the user's tokens and send notifications        
    const devicesRef = db.collection('devices').where('userId', '==', userId);
    const devices = yield devicesRef.get();
    const tokens = [];
    // send a notification to each device token
    devices.forEach(result => {
        const token = result.data().token;
        tokens.push(token);
    });
    return admin.messaging().sendToDevice(tokens, payload);
}));
//# sourceMappingURL=follower-notification.js.map