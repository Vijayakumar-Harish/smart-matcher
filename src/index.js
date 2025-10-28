import connectDB from "./config/mongoose.js";
import app from "./app.js";

const PORT =  5005;

(async () => {
    try {
        await connectDB();
        app.listen(PORT, () => console.log(`Server running on ${PORT}`));
    } catch (e) {
        console.error("Failed to start", e);
        process.exit(1);
    }
})();