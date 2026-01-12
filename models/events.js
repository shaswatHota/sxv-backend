const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema(
  {
    orgId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club' },
    email: {
      type: String,
    },
    day: {
      type: Number,
      required: true,
    },
    eventName: {
      type: String,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    posterUrl: {
      type: String,
      required: false,
    },
    venue: {
      type: String,
      required: true,
    },
    organiser: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    registrationLink: {
      type: String,
      required: false,
    },
    firstPrize: {
      type: String,
      required: false,
    },
    secondPrize: {
      type: String,
      required: false,
    },
    thirdPrize: {
      type: String,
      required: false,
    },
    eventType: { type: String, required: true },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('Event', eventSchema)
