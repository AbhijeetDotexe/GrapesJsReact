import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  data: {},
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
