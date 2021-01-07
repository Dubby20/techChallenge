import { connection } from 'mongoose';

/**
* @description fetch records
* @param {object} req http request object
* @param {object} res http response object
*@function fetchRecords

* @returns {object} response
*/
const fetchRecords = async (req, res) => {
  const {
    body: {
      startDate,
      endDate,
      maxCount,
      minCount
    }
  } = req;

  try {
    const collection = await connection.db.collection('records');

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

    return res.status(200).json({
      code: 0,
      message: 'Success',
      records,
    });
  } catch (error) {
    return res.status(500).json({
      code: 0,
      message: 'Failed to fetch records',
    });
  }
};

export default fetchRecords;
