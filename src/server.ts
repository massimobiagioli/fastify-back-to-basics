import createApp from './app'

async function start() {
  const app = await createApp()

  app.listen({ port: app.config.SERVER_PORT }, (err, address) => {
    if (err != null) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.debug(`Server listening at ${address}`)
  })
}

start()
