const { DATABASE_URL, TEST_DATABASE_URL, NODE_ENV } = process.env;

const env = NODE_ENV || 'development';

const config = {
  development: DATABASE_URL,
  test: TEST_DATABASE_URL,
};

const connectDB = NODE_ENV === 'test' ? config.test : config.development;

export default connectDB;
