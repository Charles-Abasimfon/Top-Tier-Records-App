const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const date = new Date();
const todaysDate =
  date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();

const adminSchema = mongoose.Schema(
  {
    shorter_id: {
      type: String,
      required: true,
      default: () => nanoid(7),
      index: { unique: true },
    },
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    status: {
      type: String,
      required: [true, 'Please pass admin status: Active/Suspended'],
      default: 'Active',
    },
    added: {
      type: String,
      required: [true, 'Please add a date'],
      default: todaysDate,
      immutable: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: 8,
    },
    admin_level: {
      /* admin_level can be any of these: Administrator(Can do everything), Recorder(Can add new jobs/designs, add the job/design tag, Can add if half/full payment, also can move from pending/late to done), Moderator (Only can move a job from Pending/Late to Done). */
      type: String,
      default: 'Recorder',
      immutable: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Admin', adminSchema);
