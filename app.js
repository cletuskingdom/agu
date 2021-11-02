const express = require('express')
const globalErrorHandler = require('./middleware/errors/globalErrorHandler')
const users = require('./routes/user')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()

// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//           title: "Agulite Platform Backend API",
//           description: "The backend support for the Agulite front platform",
//           contact: {
//               name: "Favour Max-Oti",
//               email: "maxotif@gmail.com"
//           },
//           servers: ["http://localhost:4000/api/v1/users"]
//         }
//     },
//     apis: ["app.js"]
// }

const swaggerOptions={
    swaggerDefinition:{
      infor:{
        title:'library Api',
        version:'1.0.0'
      }
    },
    
    // apis:['app.js']//whwer to f=grt the documentaion from
    apis:['./routes/*.js']
  };
//middleware
app.use(express.json())

const swaggerDocs = swaggerJsDoc(swaggerOptions)
console.log(swaggerDocs)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


// // routes
// /**
//  * @swagger
//  * /signup:
//  * post:
//  *  description: endpoint for registration of users
//  *  responses:
//  *  '201':
//  *      description: The user has been successfully registered. This returns the object containing the user registration details
//  *  
//  * */ 
app.use('/api/v1/users', users)

app.all('*', (req, res, next) => {
    const err = new Error(`Can't find ${req.originalUrl} on this server!`)
    err.status = 'fail'
    err.statusCode = 404
    
    next(err)
})

app.use(globalErrorHandler)


module.exports = app