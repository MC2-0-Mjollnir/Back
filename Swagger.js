import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Documentation',
            version: '1.0.0',
            description: 'API documentation for the project'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ]
    },
    apis: ['./models/*.js', './controllers/*.js', './routes/*.js']
};

const specs = swaggerJsdoc(options)

export default (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
}