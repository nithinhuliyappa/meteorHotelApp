import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Members } from '../api/members';
import { Rooms } from '../api/rooms';

import './body.html';
import './members.html';
import './rooms.html';

AutoForm.setDefaultTemplate('materialize');

window.Members = Members;
window.Rooms = Rooms;

Template.registerHelper('formatDate', function (date) {
    return moment(date).format('MMM DD YYYY');
})

Template.body.onCreated(function bodyOnCreated() {
    Meteor.subscribe('members.allMembers');
    Meteor.subscribe('rooms.vacantRooms');
    Meteor.subscribe('rooms.allRooms');
})

Template.members.helpers({
    members() {
        return Members.find({});
    }
})

Template.rooms.helpers({
    allRooms() {
        return Rooms.find({});
    }
})

Template.room.helpers({
    makeUniqueID() {
        return this._id;
    },
    returnName(tenantID) {
        console.log(tenantID);
        const member = Members.findOne({ _id: tenantID });
        return `${member.firstName} ${member.lastName}`;
    }
})

Template.members.onRendered(function () {
    $('#modal1').modal();
})

Template.rooms.onRendered(function () {
    $('.collapsible').collapsible();
})