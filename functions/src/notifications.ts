import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const newCategoryPost = functions.firestore

  .document("posts/{postId}")
  .onCreate(async (snap, event) => {
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
  });
