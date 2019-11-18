import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { Members } from "./members";

SimpleSchema.extendOptions(['autoform']);

export const Rooms = new Mongo.Collection("rooms");

const RoomSchema = new SimpleSchema({
  roomNumber: { type: Number },
  checkIn: { type: Date },
  checkOut: { type: Date },
  tenantID: {
    type: String,
    autoform: {
      type: 'select',
      options: function () {
        return Members.find().map(function (doc) {
          return { label: `${doc.firstName} ${doc.lastName}`, value: doc._id }
        })
      }
    }
  },
  available: {
    type: Boolean,
    autoform: {
      type: 'boolean-select'
    }
  },
  needCleaning: {
    type: Boolean,
    autoform: {
      type: 'boolean-select'
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      type: "hidden",
      label: false
    },
    defaultValue: new Date()
  }
});

Rooms.attachSchema(RoomSchema);

//export default Rooms;
