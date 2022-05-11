const mongoose = require('mongoose');

// SETTINGS MODEL
const settingsSchema = mongoose.Schema(
  {
    can_recorders_add_new_jobs: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_mark_jobs_as_completed: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_reassign_jobs_to_other_designers: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_change_job_payment_status: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_change_job_main_category: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_change_job_sub_categories: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_change_job_start_date: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_change_job_additional_info: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_recorders_change_client_name: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_moderators_add_new_jobs: {
      type: Boolean,
      default: false,
      required: true,
    },
    can_moderators_mark_jobs_as_completed: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_moderators_reassign_jobs_to_other_designers: {
      type: Boolean,
      default: false,
      required: true,
    },
    can_moderators_change_job_payment_status: {
      type: Boolean,
      default: false,
      required: true,
    },
    can_moderators_change_job_main_category: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_moderators_change_job_sub_categories: {
      type: Boolean,
      default: true,
      required: true,
    },
    can_moderators_change_job_start_date: {
      type: Boolean,
      default: false,
      required: true,
    },
    can_moderators_change_job_additional_info: {
      type: Boolean,
      default: false,
      required: true,
    },
    can_moderators_change_client_name: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', settingsSchema);
