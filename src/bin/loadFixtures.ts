import createApp from '../app'

const app = createApp()

app.ready().then(() => {
  app.fixtures
    .load()
    .then(() => {
      app.log.info('Fixtures loaded')
      process.exit(0)
    })
    .catch((err) => {
      app.log.error(err)
      process.exit(1)
    })
})
