import chai from 'chai';
import chaiHttp from 'chai-http';
import mongoose from 'mongoose';
import app from '../app';
import recordData from './helpers/recordData';
import connectDB from '../config';

const { expect } = chai;

chai.use(chaiHttp);

before(async () => {
  await mongoose.connect(connectDB);
});

describe('Make a request to an wrong route', () => {
  it('returns 404 error', () => {
    chai
      .request(app)
      .get('/wrong-url')
      .end((err, res) => {
        const {
          status,
          body: { error },
        } = res;
        expect(status).to.be.equal(404);
        expect(error).to.be.equal('Path not found.');
      });
  });

  it('returns the home page successfully', () => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        const {
          status,
          body: { message },
        } = res;
        expect(status).to.be.equal(200);
        expect(message).to.be.equal('Welcome to Getir Tech Challenge');
      });
  });
});

describe('Fetch records', () => {
  it('should return records successfully', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[0])
      .end((err, res) => {
        const {
          status,
          body: { code, message },
        } = res;
        expect(status).to.be.equal(200);
        expect(code).to.be.equal(0);
        expect(message).to.be.equal('Success');
      });
  });

  it('should return invalid startDate', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[1])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;
        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal(
          'startDate must be a valid date in a YYYY-MM-DD format'
        );
      });
  });

  it('should return error if startDate is empty', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[2])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;
        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('startDate is required');
      });
  });

  it('should return error if endtDate is invalid', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[3])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;
        console.log('>>>>>>', res.body);
        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal(
          'endDate must be a valid date in a YYYY-MM-DD format'
        );
      });
  });

  it('should return error if endtDate is empty', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[4])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;
        console.log(res.body);
        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('endDate is required');
      });
  });

  it('should return error if maxCount is not a number', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[5])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;

        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('maxCount must be numeric');
      });
  });

  it('should return error if minCount is not a number', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[6])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;

        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('minCount must be numeric');
      });
  });

  it('should return error if startDate is greater than endDate', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[7])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;

        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('endDate must be greater than startDate');
      });
  });

  it('should return error if minCount is greater than maxCount', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[8])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;
        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('maxCount must be greater than minCount');
      });
  });

  it('should return error if minCount field is missing', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[9])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;
        console.log(res.body);
        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('minCount is required');
      });
  });

  it('should return error if maxCount field is missing', async () => {
    chai
      .request(app)
      .post('/api/v1/records')
      .send(recordData[10])
      .end((err, res) => {
        const {
          status,
          body: { code, error },
        } = res;
        console.log(res.body);
        expect(status).to.be.equal(422);
        expect(code).to.be.equal(1);
        expect(error).to.be.equal('maxCount is required');
      });
  });
});
