const { DATABASE_URL, TEST_DATABASE_URL, NODE_ENV } = process.env;
console.log('??????', DATABASE_URL);

const env = NODE_ENV || 'development';
console.log('this is the environment: ', env);

const config = {
  development: DATABASE_URL,
  test: TEST_DATABASE_URL,
};

const connectDB = NODE_ENV === 'test' ? config.test : config.development;

export default connectDB;
