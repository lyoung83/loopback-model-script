'use strict'
//add the models you create to the models array
const models = []

module.exports = function updateCustomModels (app, next) {
  // reference to our datasource
  const postgres = app.dataSources.yourAppName

  // check to see if the model is out of sync with DB
  postgres.isActual(models, (err, actual) => {
    if (err) {
      throw err
    }

    let syncStatus = actual ? 'in sync' : 'out of sync'
    console.log('')
    console.log(`Custom models are ${syncStatus}`)
    console.log('')

    // if the models are in sync, move along
    if (actual) return next()

    console.log('Migrating Custom Models...')

    // update the models
    postgres.autoupdate(models, (err, result) => {
      if (err) throw err
      console.log('Custom models migration successful!')
      console.log('')
      next()
    })
  })
}
