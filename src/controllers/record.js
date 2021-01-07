import { connection } from 'mongoose';

const fetchRecords = async (req, res) => {
  const {
    body: {
      startDate,
      endDate,
      maxCount,
      minCount
    }
  } = req;

  const collection = await connection.db.collection('records');

  try {
    const projectRecord = {
      $project: {
        _id: false,
        key: true,
        createdAt: true,
        totalCount: {
          $sum: '$counts',
        },
      },
    };

    const matchRecord = {
      $match: {
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
        totalCount: {
          $gte: minCount,
          $lte: maxCount,
        },
      },
    };

    const records = await collection.aggregate([projectRecord, matchRecord]).toArray();

    if (!records) {
      return res.status(404).json({
        code: 1,
        message: 'No record found'
      });
    }

    return res.status(200).json({
      code: 0,
      message: 'Success',
      records,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch records',
    });
  }
};

export default fetchRecords;
