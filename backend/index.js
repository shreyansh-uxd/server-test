const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

// ✅ Hardcoded MongoDB URI
const MONGO_URI = 'mongodb+srv://harshkumaruxdlab12_db_user:c26PQsbtCLyunHvV@cluster0.4lylzmb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Mongoose model
const User = require('./models/user');

// Routes
const userRouter = require('./routes/users');
app.use('/api/users', userRouter);

async function start() {
  try {
    if (!MONGO_URI) {
      console.error('MongoDB URI is not defined.');
      process.exit(1);
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

start();
