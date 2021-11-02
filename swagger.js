const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const app = require('./app')

const swaggerOptions = {
    swaggerDefinition: {
        info: {
          title: "Agulit Platform Backend API",
          description: "The backend support for the agulite front platform",
          contact: {
              name: "Favour Max-Oti",
              email: "maxotif@gmail.com"
          },
          servers: ["http://localhost:4000"]
        }
    },
    apis: ['./routes/*.js']
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))