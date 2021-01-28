import express, { Application } from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import appRouter from './appRouter'

const app: Application = express()

app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(helmet({ contentSecurityPolicy: false }))

// Express will serve up production assets
// like our main.js file, or main.css file!
app.use(express.static('client'))

appRouter(app)

export default app
