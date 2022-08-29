require('dotenv/config');

export default {
  mongoURI: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@backend-database.dphljvp.mongodb.net/?retryWrites=true&w=majority`,
};
