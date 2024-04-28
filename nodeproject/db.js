var mongoose = require("mongoose");
var MONGODB_URL = "mongodb://0.0.0.0:27017/student_db";

mongoose.connect(MONGODB_URL).then(() => {
		console.log("Database connected");
})
.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
});

var db = mongoose.connection; 