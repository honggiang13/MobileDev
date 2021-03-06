import { FcmProvider } from "./../fcm/fcm";
import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";

export interface PostUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  [key: string]: any;
}

export interface Post {
  userId: string;
  createdAt: Date;
  image: string;
  content: string;
  category: string;
  likeCount: number;
  location: string;
  [key: string]: any;
}

@Injectable()
export class DatabaseProvider {
  private postsRef: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore, private fcm: FcmProvider) {
    this.postsRef = this.afs.collection("posts");
  }

  getRecentPosts() {
    return this.afs.collection<Post>("posts", ref =>
      ref.orderBy("createdAt", "desc").limit(20)
    );
  }

  getUserPosts(userId: string) {
    return this.afs.collection<Post>("posts", ref =>
      ref.orderBy("createdAt", "desc").where("userId", "==", userId)
    );
  }

  getUserInfo(userId: string) {
    return this.afs.doc<any>(`users/${userId}`).valueChanges();
  }

  createPost(userId: string, data: Post) {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { userId, createdAt, ...data };
    return this.postsRef.add(doc);
  }

  deletePost(id: string) {
    return this.postsRef.doc(id).delete();
  }

  //// HEARTS ////

  createHeart(userId: string, post: Post) {
    const hearts = post.hearts || {};
    hearts[userId] = true;

    return this.afs.doc(`posts/${post.id}`).update({ hearts });
  }

  removeHeart(userId: string, post: Post) {
    const hearts = post.hearts;
    delete post.hearts[userId];

    return this.afs.doc(`posts/${post.id}`).update({ hearts });
  }

  //// RELATIONSHIPS ////

  getUsers() {
    return this.afs.collection("users", ref => ref.limit(10)).valueChanges();
  }

  async follow(userId: string, category: string): Promise<void> {
    const user = await this.afs
      .doc<any>(`users/${userId}`)
      .valueChanges()
      .toPromise();

    const categories = user.categories || {};
    categories[category] = true;

    this.fcm.subscribeTo(category);

    return this.afs
      .collection("users")
      .doc(userId)
      .update({ categories });
  }

  async unfollow(userId: string, category: string): Promise<void> {
    const user = await this.afs
      .doc<any>(`users/${userId}`)
      .valueChanges()
      .toPromise();

    const categories = user.categories || {};
    delete categories[category];

    this.fcm.unsubscribeFrom(category);

    return this.afs
      .collection("users")
      .doc(userId)
      .update({ categories });
  }

  updateCategories(userId: string, datas: string[]) {
    let categories: { [key: string]: any };

    datas.forEach(category => {
      categories[category] = true;
    });

    return this.afs
      .collection("users")
      .doc(userId)
      .update({ categories });
  }

  isFollowing(followerId: string, followedId: string) {
    const docId = this.concatIds(followerId, followedId);

    return this.afs
      .collection("relationships")
      .doc(docId)
      .valueChanges();
  }

  // Helper to format the docId for relationships
  private concatIds(a: string, b: string) {
    return `${a}_${b}`;
  }
}
