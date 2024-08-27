import  { Schema, model } from "mongoose";

const ReviewSchema = new Schema({
  user : {
    type : Schema.ObjectId,
    ref : 'user',
    required : [true , 'user is required']
  },
  content: String,
  rate: Number,
});


const ReviewModule = model('review',ReviewSchema);

export default ReviewModule;