import mongoose from "mongoose";
import connectDB from "./db/config.js";

connectDB();

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "null"],
    default: "null",
  },
  age: {
    type: Number,
  },
});

const Character = mongoose.model("Character", characterSchema);

const animeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  releaseYear: {
    type: Number,
  },
  genre: [],
  characters: {
    type: [characterSchema],
    required: true,
  },
});

const Anime = mongoose.model("Anime", animeSchema);

async function createAnime(name, releaseYear, genre, characters) {
  await new Anime({
    name: name,
    releaseYear: releaseYear,
    genre: genre,
    characters: characters,
  })
    .save()
    .then((result) => console.log(result))
    .catch((error) => {
      console.log(`Error occured while creating new Anime: ` + error);
    });
}

async function addCharacter(animeID, character) {
  const anime = await Anime.findById(animeID);
  anime.characters.push(character);
  anime.save().then((result) => {
    console.log("After adding Character: " + result);
  });
}

async function delCharacter(animeID, characterID) {
  const anime = await Anime.findById(animeID);
  anime.characters = anime.characters.filter(
    (el) => el._id.toString() != characterID
  );
  anime.save().then((result) => console.log("After Deletion: " + result));
}

async function alsoDelCharacter(animeID, characterID) {
  const anime = await Anime.findById(animeID);
  anime.characters.pull(characterID); // mongoose inbuilt pull method
  await anime.save().then((result) => console.log("After Deletion: " + result));
}

async function showAnime() {
  const result = await Anime.find({}).populate("characters");
  console.log(result);
}

/* OPERATIONS 

createAnime(
  "hunter X hunter",
  2011,
  ["action", "adventure", "fantasy"],
  [
    new Character({
      name: "Gon Freecs",
      gender: "male",
      age: 12,
    }),
    new Character({
      name: "Kurapika",
      gender: "female",
      age: 17,
    }),
  ]
);

addCharacter(
  "64e1af600845bda1fe886ed7",
  new Character({
    name: "Leorio",
    gender: "male",
    age: 19,
  })
);

showAnime();

delCharacter("64e1af600845bda1fe886ed7", "64e1d1d8dbe4317c1ff7197d");

*/
