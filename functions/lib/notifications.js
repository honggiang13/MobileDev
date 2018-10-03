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
exports.newCategoryPost = functions.firestore
    .document("posts/{postId}")
    .onCreate((snap, event) => __awaiter(this, void 0, void 0, function* () {
    const post = snap.data();
    if (!post.category) {
        return null;
    }
    // Notification content
    const payload = {
        notification: {
            title: post.category,
            body: "Read the latest " + post.category + " post!",
            icon: "https://goo.gl/Fz9nrQ"
        }
    };
    return admin.messaging().sendToTopic(post.category, payload);
}));
//# sourceMappingURL=notifications.js.map