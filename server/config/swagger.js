const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ticket Management System API',
      version: '1.0.0',
      description: 'API documentation for the ticket management system with customer support, agent workflows, and admin controls',
      contact: {
        name: 'API Support',
        email: 'cottoneightservice@gmail.com'
      }
    },
    servers: [
      {
        url: '/api',
        description: 'API Server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token'
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            role: {
              type: 'string',
              enum: ['customer', 'service_agent', 'admin'],
              description: 'User role'
            },
            isVerified: {
              type: 'boolean',
              description: 'Email verification status'
            },
            profilePicture: {
              type: 'string',
              description: 'Profile picture URL'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Ticket: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Ticket ID'
            },
            title: {
              type: 'string',
              description: 'Ticket title'
            },
            description: {
              type: 'string',
              description: 'Ticket description'
            },
            category: {
              type: 'string',
              enum: ['technical', 'billing', 'general', 'feature_request'],
              description: 'Ticket category'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'urgent'],
              description: 'Ticket priority'
            },
            status: {
              type: 'string',
              enum: ['open', 'in_progress', 'resolved', 'closed'],
              description: 'Ticket status'
            },
            userId: {
              type: 'string',
              description: 'ID of user who created the ticket'
            },
            assignedTo: {
              type: 'string',
              description: 'ID of assigned agent'
            },
            attachments: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  filename: { type: 'string' },
                  url: { type: 'string' },
                  size: { type: 'number' }
                }
              }
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Chat: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'Chat message ID'
            },
            ticketId: {
              type: 'string',
              description: 'Associated ticket ID'
            },
            userId: {
              type: 'string',
              description: 'ID of user who sent the message'
            },
            message: {
              type: 'string',
              description: 'Chat message content'
            },
            timestamp: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        CreateTicket: {
          type: 'object',
          required: ['title', 'description', 'category', 'priority'],
          properties: {
            title: {
              type: 'string',
              description: 'Ticket title'
            },
            description: {
              type: 'string',
              description: 'Ticket description'
            },
            category: {
              type: 'string',
              enum: ['technical', 'billing', 'general', 'feature_request'],
              description: 'Ticket category'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'urgent'],
              description: 'Ticket priority'
            }
          }
        },
        UpdateTicket: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Ticket title'
            },
            description: {
              type: 'string',
              description: 'Ticket description'
            },
            status: {
              type: 'string',
              enum: ['open', 'in_progress', 'resolved', 'closed'],
              description: 'Ticket status'
            },
            priority: {
              type: 'string',
              enum: ['low', 'medium', 'high', 'urgent'],
              description: 'Ticket priority'
            },
            assignedTo: {
              type: 'string',
              description: 'ID of assigned agent'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password'
            }
          }
        },
        SignupRequest: {
          type: 'object',
          required: ['firstName', 'lastName', 'email', 'password'],
          properties: {
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            error: {
              type: 'string',
              description: 'Error details'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization'
      },
      {
        name: 'Users',
        description: 'User management operations'
      },
      {
        name: 'Tickets',
        description: 'Ticket management operations'
      },
      {
        name: 'Chat',
        description: 'Chat and messaging operations'
      },
      {
        name: 'Analytics',
        description: 'Analytics and reporting'
      },
    ]
  },  apis:  [
        path.join(__dirname, '../routes/*.js'),
        path.join(__dirname, '../controllers/*.js'),
        path.join(__dirname, '../models/*.js'),
        path.join(__dirname, '../middleware/*.js')
    ]
  };

const specs = swaggerJsdoc(options);

// Create a wrapper for the Swagger UI to safely handle URLs
const createSwaggerSetup = (specs) => {
  return swaggerUi.setup(specs, {
    explorer: true,
    swaggerOptions: {
      url: '/api-docs/swagger.json' // Use a relative path
    }
  });
};

console.log('Swagger Initialization:');
console.log('Found Routes:', Object.keys(specs.paths || {}));
console.log('API Files Found:', options.apis);
console.log('Tags Found:', specs.tags);

module.exports = { 
  specs, 
  swaggerUi,
  swaggerSetup: createSwaggerSetup(specs, {
    explorer: true,
    customSiteTitle: "Ticket Management System API"
    })
};
