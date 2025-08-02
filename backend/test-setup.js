const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('🔍 Testing MongoDB connection...');
    
    // Test MongoDB connection
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mindful-maker', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ MongoDB Connected:', conn.connection.host);
    
    // Test creating collections
    const User = require('./models/User');
    const Session = require('./models/Session');
    
    console.log('✅ Models loaded successfully');
    console.log('✅ Backend setup is complete!');
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    console.log('\n💡 Make sure to:');
    console.log('1. Copy env.example to .env');
    console.log('2. Set your MONGO_URI in .env');
    console.log('3. Start MongoDB service');
  }
}

testConnection(); 