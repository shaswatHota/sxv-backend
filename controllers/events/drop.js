const mongoose = require('mongoose')


exports.dropDB = async () => {
  try {
    await mongoose.connection.dropDatabase()
    console.log('Database dropped successfully.')

  } catch (err) {
    console.error('Error dropping database:', err)
  }
}

