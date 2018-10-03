"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agg = require("./aggregation");
const notify = require("./notifications");
const subsc = require("./follower-notification");
// Aggregation Functions
exports.updateFollowerCount = agg.updateFollowerCounts;
exports.updatePostCount = agg.updatePostCount;
// Notification Functions
exports.categoryNotifications = notify.newCategoryPost;
exports.newSubscriberNotification = subsc.newSubscriberNotification;
//# sourceMappingURL=index.js.map