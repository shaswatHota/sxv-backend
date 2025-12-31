require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
// const userRouter = require('./routes/userRoute')

app.use(cors({
  origin: [
    'http://localhost:3000', 
    'https://www.festvssut.in', 
    'https://www.festvssut.fun', 
    'https://dev.festvssut.in', 
    'https://fest-admin-panel.vercel.app',
    'https://sxv-frontend-jade.vercel.app',
    'https://sxv-website.vercel.app/'
    
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.get("/",(req,res)=>{
  res.send("Welcome to sxv be")
})

// app.use(userRouter)
const eventRoutes = require("./routes/events/events.routes");
app.use("/api/events", eventRoutes);
const authRoutes = require("./routes/Auth/auth.routes");
app.use("/api/auth", authRoutes);
const paymentRoutes = require('./routes/payment/payment.routes')
app.use("/api/payment", paymentRoutes);
const contactRoutes = require("./routes/contact/contact.routes")
app.use("/api/contact", contactRoutes);
const clubRoutes = require("./routes/club/club.routes")
app.use("/api/clubs", clubRoutes);
const userRoutes = require('./routes/user/user.routes')
app.use("/api/users", userRoutes);
const ticketRoutes = require('./routes/ticket/ticket.routes')
app.use("/api/ticket", ticketRoutes);
mongoose.set("strictQuery", false);
const passwordRoutes = require('./routes/password/pwd.routes')
app.use("/api/password", passwordRoutes)

// const port = process.env.PORT || 8000
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     app.listen(port, () => {
//       console.log("connected to db");
//     });
//   })
//   .catch((err) => {
//     console.log(err);
//   });


// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => console.log(err));

//just for checking
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
} else {
  console.warn(" MongoDB not connected (review mode)");
}

module.exports = app;
app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port 8000");
});
