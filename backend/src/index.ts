import appServer from './appServer'

const port = 5000

// Start server
appServer.listen(port, () => console.log(`Server is listening on port ${port}!`))
