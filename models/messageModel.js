import mongoose from 'mongoose'

const messageSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    message: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

messageSchema.method('toJSON', function() {
  const { __v, _id, ...object } = this.toObject();
  object.uid = _id;
  return object;
})

const Message = mongoose.model('Message', messageSchema)

export default Message