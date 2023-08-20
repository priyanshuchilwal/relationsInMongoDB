import mongoose from "mongoose";
import connectDB from "./db/config.js";

connectDB();

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const courseSchema = new mongoose.Schema({
  name: String,
  author: {
    type: authorSchema,
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse(name, author) {
  new Course({
    name: name,
    author: author,
  })
    .save()
    .then((saved) => {
      console.log(saved);
    })
    .catch((error) => console.log(error));
}

async function showCourses() {
  const found = await Course.find({});
  console.log(found);
}

async function updateCourseAuthor(courseID) {
  await Course.updateOne(
    { _id: courseID },
    { $set: { "author.name": "priyanshu coder" } }
  );
}

async function deleteAuthor(courseID) {
  await Course.updateOne(
    { _id: courseID },
    {
      $unset: {
        // unsetting author property to '' -- empty string
        author: "",
      },
    }
  );
}

// Author become sub-document of Course
createCourse(
  "how to use linux",
  new Author({
    name: "priyanshu",
    bio: "gym bro",
    website: "mindAtGym",
  })
);

// updateCourseAuthor("64e0810607d5e1b6ca179ebe");

// deleteAuthor("64e0829644ca89f3bfa9f701");

showCourses();
