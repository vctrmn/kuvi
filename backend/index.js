const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')

// Start Express server
const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(helmet({ contentSecurityPolicy: false }))

// Express will serve up production assets
// like our main.js file, or main.css file!
app.use(express.static('client'))

// Liveness Probe route
app.get('/healthz', (req, res) => res.status(200).send('OK'))

require('./services/kubernetesService')(app)

// Express will serve up the index.html file
// if it doesn't recognize the route
const path = require('path')
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})

// Express server listen on port
app.listen(PORT)
