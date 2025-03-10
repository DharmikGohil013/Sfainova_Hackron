// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import authRoute from "./router/auth.js";
// import userRoute from "./router/users.js";
// import bookingRoute from "./router/bookings.js";
// import blogRoute from "./router/blog.js";
// import facilityRoute from "./router/facility.js";

// dotenv.config();
// const app = express();
// const port = process.env.PORT || 8000;

// app.get('/', (req, res) => {
//   res.send('Hello, world!');
// });

// mongoose.set("strictQuery", false);

// async function connect() {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log("MongoDB Database Connected");
//   } catch (err) {
//     console.log("MongoDB Database Connection Failed");
//   }
// }

// const corsOptions = {
//   origin: true,
//   credentials: true,
// };

// app.use(express.json());
// app.use(cors(corsOptions));
// app.use(cookieParser());
// app.use("/api/v1/auth", authRoute);
// app.use("/api/v1/users", userRoute);
// app.use("/api/v1/booking", bookingRexitoute);
// app.use("/api/v1/blogs", blogRoute);
// app.use("/api/v1/facility", facilityRoute);

// app.listen(port, () => {
//   connect();
//   console.log("Server is listening on port", port);
// });
//



// Backend/server.js
import express from 'express';
import connectDB from './db.js'; // ✅ Correct: Points to a local file
import authRoutes from '../Backend/router/auth.js';
import blogRoutes from './router/blog.js';
import bookingRoutes from './router/bookings.js';
import facilityRoutes from './router/facility.js';
import userRoutes from './router/users.js';
import dotenv from 'dotenv';
// // index.js
// import authRoutes from './routes/authRoutes.js'; // Use .js extension

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/facilities', facilityRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});