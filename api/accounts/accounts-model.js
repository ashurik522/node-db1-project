const db = require('../../data/db-config')

const getAll = (query) => {
  let { page = 1, limit = 13, sortBy = 'id', sortdir = 'asc' } = query
  const offset = limit * (page -1)

  let rows = db('accounts')
    .orderBy(sortBy, sortdir)
    .limit(limit)
    .offset(offset)
  return rows
}

const getById = id => {
  return db('accounts')
    .where('id',  id)
    .first()
}

const getNames = name => {
  return db('accounts')
    .where('name', name)
    .first()
}


const create = account => {
  return db('accounts')
    .insert(account)
    .then(id => {
      return getById(id[0])
    })
}

const updateById = (id, account) => {
  return db('accounts')
    .where('id', id)
    .update(account)
    .then(res => {
      if(res === 0){
        return null
      }
      return getById(id)
    })
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
  getNames
}
