import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        unique: "true"

    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique : "true",
        required: true
    }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;