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

const getNames = () => {
  return db('accounts')
    .where('name')
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  getNames
}
