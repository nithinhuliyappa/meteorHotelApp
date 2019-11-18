import { Meteor } from "meteor/meteor";
import _ from "lodash";
import faker from "faker";
import { Members } from "../imports/api/members";
import { Rooms } from "../imports/api/rooms";

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish("members.allMembers", () => {
    return Members.find();
  });

  const membersCount = Members.find({}).count();

  if (!membersCount) {
    _.times(10, () => {
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      const member = faker.internet.userName();
      const street = faker.address.streetAddress();
      const city = faker.address.city();
      const state = faker.address.state();
      const zip = faker.address.zipCode();
      const lastCheckOut = faker.date.past();
      const numberOfNights = faker.random.number(20);
      const preferences = faker.random.words();

      Members.insert({
        firstName,
        lastName,
        member,
        street,
        city,
        state,
        zip,
        lastCheckOut,
        numberOfNights,
        preferences,
        createdAt: new Date()
      });

    });

  }

  Meteor.publish("rooms.vacantRooms", () => {
    return Rooms.find({ available: true });
  });

  Meteor.publish("rooms.allRooms", () => {
    return Rooms.find();
  });

  const roomsCount = Rooms.find({}).count();

  if (!roomsCount) {
    _.times(30, (roomNumber) => {
      roomNumber++;
      const checkIn = faker.date.past();
      const checkOut = faker.date.future();

      Rooms.insert({
        roomNumber,
        checkIn,
        checkOut,
        tenantID: "NAN",
        available: true,
        needCleaning: true,
        createdAt: new Date
      })

      return roomNumber;
    })
  }
});
