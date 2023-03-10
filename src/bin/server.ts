import createApp from '../app'

const app = createApp()

app.ready().then(() => {
  app.listen({ port: app.config.SERVER_PORT }, (err, address) => {
    if (err != null) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.debug(`Server listening at ${address}`)
  })
})
