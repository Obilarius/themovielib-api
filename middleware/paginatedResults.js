function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec()))
      results.nextPage = page + 1;
    if (startIndex > 0) results.prevPage = page - 1;

    try {
      results.results = await model
        .find()
        .limit(limit)
        .skip(startIndex)
        .exec();

      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).send(e.message);
    }
  };
}

module.exports = paginatedResults;
