const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

// JOBS MODEL
const jobsSchema = mongoose.Schema(
  {
    shorter_id: {
      type: String,
      required: true,
      default: () => nanoid(7),
      index: { unique: true },
    },
    payment_status: {
      type: String,
      required: [true, 'Please add a payment : Half/Full'],
    },
    main_category: {
      type: String,
      required: [
        true,
        'Please add a job main category : example: Graphic Design, Website Development',
      ],
    },
    sub_categories: {
      type: String,
    },
    designer_tag: {
      type: String,
    },
    client_name: {
      type: String,
      required: [true, 'Please add a client name'],
    },
    start_date: {
      type: String,
      required: [true, 'Missing date'],
    },
    is_completed_status: {
      type: Boolean,
      default: false,
      required: [true, 'Missing is completed status'],
    },
    additional_info: {
      type: String,
    },
    note: {
      type: String,
      default: 'Nil',
      required: [true, 'Missing note'],
      /* Can be Delivered(Awaiting client response) or Corrections(Awaiting designers delivery)*/
    },
    reminded_status: {
      type: String,
      default: 'Not Reminded',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Jobs', jobsSchema);
