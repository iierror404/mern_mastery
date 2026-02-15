import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
  logType: {
    type: String,
    require: true,
    trim: true,
  },
  logBody: {
    type: String,
    require: true,
    trim: true,
  }
}, { timestamps: true });

const Logs = mongoose.model("Logs", logsSchema);

export default Logs;
