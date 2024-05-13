const documentation = {
  openapi: "3.0.0",
  info: {
    title: "Ekipa for Rwanda",
    version: "1.0.0",
    description: "Ekipa is a digital link of an owner and his/her car",
  },
  paths: {
    "/": {
      post: {
        tags: ["Admin"],
        summary: "Create an Admin account",
        description:
          "Create an Admin account with names, email, phone number and NID",
        produces: ["application/json"],
        requestBody: {
          description: "Admin info is to be entered into the system",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AdminInput",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Admin created successfully",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          400: {
            description: "Bad request",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["Admin"],
        summary: "Admin login",
        description: "Admin can log into his/her account",
        produces: ["application/json"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginInput",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Query OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/getDep": {
      get: {
        tags: ["Departments"],
        description: "Get all departments",
        summary: "Get all departments",
        produces: ["application/json"],
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          200: {
            description: "Query OK",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/getAll": {
        get: {
          tags: ["Employees"],
          description: "Get all employees",
          summary: "Get all employees",
          produces: ["application/json"],
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Query OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      message: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      AdminInput: {
        type: "object",
        properties: {
          username: {
            type: "string",
            example: "ruth",
          },
          password: {
            type: "string",
            example: "user2@2",
          },
          confirmPassword: {
            type: "string",
            example: "user2@2",
          },
        },
      },
      LoginInput: {
        type: "object",
        properties: {
          username: {
            type: "string",
            example: "ruth",
          },
          password: {
            type: "string",
            example: "user2@2",
          },
        },
      },
      EmployeeInput: {
        type: "object",
        properties: {},
      },
    },
  },
};

export default documentation;
