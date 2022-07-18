const db = require('../../data/db-config')

const getAll = () => {
  return db('accounts')
}

const getById = id => {
  return db('accounts')
    .where('id',  id)
    .first()
    
}

const create = account => {
  // DO YOUR MAGIC
}

const updateById = (id, account) => {
  // DO YOUR MAGIC
}

const deleteById = async id => {
  const result = await getById(id)
  await db('accounts')
    .where('id', id)
    .delete()
    return result
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
