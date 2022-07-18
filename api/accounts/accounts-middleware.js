const Accounts = require('./accounts-model')
const yup = require('yup');

exports.checkAccountPayload = (req, res, next) => {
  let { name, budget } = req.body
  
  if(typeof name !== 'string' || name.trim() === "" || budget === undefined){
    res.status(400).json({ message: 'name and budget are required'})
    return;
  }  

  name = name.trim()
  if(budget === null){
    budget = NaN
  }
  budget = Number(budget)
 

  if(name.length < 3 || name.length > 100){
    res.status(400).json({ message: 'name of account must be between 3 and 100'})
    return;
  } 
  if(isNaN(budget)){
    res.status(400).json({ message: 'budget of account must be a number'})
    return;
  }
  if(budget <= 0 || budget >= 1000000){
    res.status(400).json({ message: 'budget of account is too large or too small'})
    return;
  }

  req.newAccount = { name: name, budget: budget}
  next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const names = await Accounts.getNames()
  const { name } = req.body
  names.forEach(element => {
    if(element.name == name){
      res.status(400).json({ message: 'that name is taken'})
    }
  });
 
  next()
}

exports.checkAccountId = async (req, res, next) => {
  let account = await Accounts.getById(req.params.id);
  if(account == null){
    res.status(404).json({ message: 'account not found'})
    return;
  }
  req.account = account
  next()
}

