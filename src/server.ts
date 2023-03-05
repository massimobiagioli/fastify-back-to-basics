import createApp from './app'

async function start() {
  const app = await createApp()

  app.listen({ port: app.config.SERVER_PORT }, (err, address) => {
    if (err != null) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

start()
