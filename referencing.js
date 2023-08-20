import connectDB from "./db/config.js";
import mongoose, { mongo } from "mongoose";
connectDB();

const Author = mongoose.model(
  "author",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
  })
);

const Course = mongoose.model(
  "course",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
    },
  })
);

function newAuthor(name) {
  const author = new Author({
    name: name,
  });
  author.save().catch((error) => {
    console.log(`Error: ${error}`);
  });
}

function newCourse(name, authorId) {
  const course = new Course({
    name: name,
    author: authorId,
  });

  course.save().catch((error) => {
    console.log(`Error: ${error}}`);
  });
}

function showCourses() {
  Course.find({})
    .populate("author")
    .then((course) => {
      console.log(course);
    });
}

// newAuthor("Priyanshu");
// newCourse("WebDev", "64e079a80e6eb18364e2f34d");
showCourses();
