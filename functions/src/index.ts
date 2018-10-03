import * as agg from './aggregation';
import * as notify from './notifications';
import * as subsc from './follower-notification';

// Aggregation Functions
export const updateFollowerCount = agg.updateFollowerCounts;
export const updatePostCount     = agg.updatePostCount;

// Notification Functions

export const categoryNotifications = notify.newCategoryPost;
export const newSubscriberNotification = subsc.newSubscriberNotification;