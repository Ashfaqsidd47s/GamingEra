const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userId:{
        type: String,
        require: true
    },
    desc: {
        type: String,
        max:500
    },
    img: {
        type: String,
        default: "",
    },
    likes: {
        type: Array,
        default: []
    },
    comments: {
        type: Array,
        default: []
    },
  },
  { timestamps: true}
);

module.exports = mongoose.model("Post",postSchema);