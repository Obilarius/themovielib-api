function paginatedResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    results.page = page;
    results.total_results = await model.countDocuments().exec();
    results.total_pages = Math.ceil(results.total_results / limit);

    if (endIndex < results.total_results) results.next_page = page + 1;
    if (startIndex > 0) results.prev_page = page - 1;

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
