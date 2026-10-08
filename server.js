const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Routes
const authRoutes = require('./src/routes/authRoutes');
const opportunityRoutes = require('./src/routes/opportunityRoutes');
const applicationRoutes = require('./src/routes/applicationRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ MongoDB Connected'))
    .catch(err => console.log('❌ MongoDB Connection Error:', err.message));

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api', applicationRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({
        name: '🤝 Volunteer Management API',
        status: 'active',
        version: '1.0.0'
    });
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});