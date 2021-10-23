const express = require('express')
const globalErrorHandler = require('./middleware/errors/globalErrorHandler')
const users = require('./routes/user')

const app = express()


//middleware
app.use(express.json())


// routes
app.use('/api/v1/users', users)

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.status = 'fail'
    err.statusCode = 404
    
    next(err)
})

app.use(globalErrorHandler)


module.exports = app