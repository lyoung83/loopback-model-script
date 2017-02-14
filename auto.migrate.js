// the base loopback models
const models = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role']

module.exports = function updateBaseModels (app, next) {
  // reference to our datasource
  const postgres = app.dataSources.yourAppName

  // check to see if the model is out of sync with DB
  postgres.isActual(models, (err, actual) => {
    if (err) {
      throw err
    }

    let syncStatus = actual ? 'in sync' : 'out of sync'
    console.log('')
    console.log(`Base models are ${syncStatus}`)
    console.log('')

    // if the models are in sync, move along
    if (actual) return next()

    console.log('Migrating Base Models...')

    // update the models
    postgres.autoupdate(models, (err, result) => {
      if (err) throw err
      console.log('Base models migration successful!')
      console.log('')
      next()
    })
  })
}