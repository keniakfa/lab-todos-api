import mongoose from 'mongoose'

const { Schema, model } = mongoose

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
)

export default model('Todo', todoSchema)
