async function paginate(Model, query, searchField) {
  const page = Math.max(parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(parseInt(query.limit, 10) || 20, 100);
  const filter = {};
  if (query.q && searchField) filter[searchField] = { $regex: query.q, $options: 'i' };

  const [items, total] = await Promise.all([
    Model.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit),
    Model.countDocuments(filter),
  ]);

  return { items, total, page, pages: Math.ceil(total / limit) };
}

module.exports = { paginate };
