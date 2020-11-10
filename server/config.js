const config = {
  server: {
    port: process.env.PORT || 443,
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/gamestudio',
    dbName: process.env.MONGODB_DBNAME || 'gamestudio',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  jwt: {
    secret: process.env.JWT_SECRET || '.'
  }
}

module.exports = config