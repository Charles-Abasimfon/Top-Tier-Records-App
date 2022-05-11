const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const path = require('path');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//LAUNCHING MONGODB CONNECTION
const connectDB = require('./config/db');
connectDB();

/* ROUTES -- START */
//IMPORTING ROUTES
const adminRoutes = require('./routes/adminRoutes');
const jobRoutes = require('./routes/jobRoutes');
const logsRoutes = require('./routes/logsRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

//USING ROUTES
app.use('/api/admin', adminRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/logs', logsRoutes);
app.use('/api/settings', settingsRoutes);
/* ROUTES -- END */

//Serve frontend in production ready application
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    );
  });
} else {
  app.get('/', (req, res) => {
    res.send('Please set to production mode');
  });
}

// Middleware to change a bit of how throw Error displays errors
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
