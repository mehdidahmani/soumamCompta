const mongoose = require('mongoose');
const moment = require('moment');

const InvoiceModel = mongoose.model('Invoice');

const summary = async (Model, req, res) => {
  let defaultType = 'month';
  const { type } = req.query;

  if (type && ['week', 'month', 'year'].includes(type)) {
    defaultType = type;
  } else if (type) {
    return res.status(400).json({
      success: false,
      result: null,
      message: 'Invalid type',
    });
  }

  const currentDate = moment();
  let startDate = currentDate.clone().startOf(defaultType);
  let endDate = currentDate.clone().endOf(defaultType);

  const pipeline = [
    {
      $facet: {
        totalProducts: [
          {
            $match: {
              removed: false,
              enabled: true,
            },
          },
          {
            $count: 'count',
          },
        ],
        newProducts: [
          {
            $match: {
              removed: false,
              created: { $gte: startDate.toDate(), $lte: endDate.toDate() },
              enabled: true,
            },
          },
          {
            $count: 'count',
          },
        ],
        soldProducts: [
          {
            $lookup: {
              from: InvoiceModel.collection.name, // Reference InvoiceModel collection
              localField: '_id', // Match _id from ProductModel
              foreignField: 'product', // Match product field in InvoiceModel
              as: 'invoice',
            },
          },
          {
            $match: {
              'invoice.removed': false,
            },
          },
          {
            $group: {
              _id: '$_id',
            },
          },
          {
            $count: 'count',
          },
        ],
      },
    },
  ];

  const aggregationResult = await Model.aggregate(pipeline);

  const result = aggregationResult[0];
  const totalProducts = result.totalProducts[0] ? result.totalProducts[0].count : 0;
  const totalNewProducts = result.newProducts[0] ? result.newProducts[0].count : 0;
  const soldProducts = result.soldProducts[0] ? result.soldProducts[0].count : 0;

  const soldProductsPercentage = totalProducts > 0 ? (soldProducts / totalProducts) * 100 : 0;
  const newProductsPercentage = totalProducts > 0 ? (totalNewProducts / totalProducts) * 100 : 0;

  return res.status(200).json({
    success: true,
    result: {
      new: Math.round(newProductsPercentage),
      sold: Math.round(soldProductsPercentage),
    },
    message: 'Successfully get summary of products',
  });
};

module.exports = summary;
