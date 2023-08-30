import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
	mongoose.set("strictQuery", false);
	const conn = await mongoose.connect(process.env.MONGO_URI);

	console.log(
		`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold
	);
};

export default connectDB;
