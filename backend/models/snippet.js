const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const snippetSchema = mongoose.Schema({
  projectName: {
    type: "string",
    required: true,
  },
  language: {
    type: "string",
    required: true,
  },
  code: {
    type: "string",
  },
});

snippetSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Snippet", snippetSchema);
