
const user = (db) => {
  db.createCollection('users', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['username', 'email'],
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          username: {
            bsonType: 'string',
            description: 'User Name',
            maxLength: 30,
          },
          email: {
            bsonType: 'string',
            description: 'Address email',
            maxLength: 30,
          },
          pwd: {
            bsonType: 'decimal',
            description: 'User password',
            maxLength: 30,
          },
          roles: {
            bsonType: [string],
            description: 'User roles in the chat',
          },
          groups: {
            bsonType: [Number],
            description: 'User roles in the chat',
          },
          login: {
            bsonType: Boolean,
            description: 'User login in the chat',
          },
          avatar: {
            bsonType: 'string',
            description: 'User avatar in the chat',
          },
        },
      },
    },
  });

  //create a user for testing
  db.collection('users').insertOne({
    username: "Marcela", email: "1@gmail.com", pwd: '123', roles: ["superAdmin"],
    roles: ["superAdmin"], groups: [1], login: false, avatar: ""
  })

}

const group = (db) => {
  db.createCollection('groups', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name'],
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          name: {
            bsonType: 'string',
            description: 'Name of the product',
            maxLength: 50,
          },
          usersIdGroup: {
            bsonType: [Number],
            description: 'Description',
            maxLength: 255,
          },
        },
      },
    }
  });

   //create a group for testing
   db.collection('groups').insertOne({
    name: "Cinema", usersIdGroup: [1],
  })
}

const channel = (db) => {
  db.createCollection('channels', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name'],
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          name: {
            bsonType: 'string',
            description: 'Name of the product',
            maxLength: 50,
          },
          group: {
            bsonType: 'int',
            description: 'This is the id group that is belong this channel',
            maxLength: 255,
          },
          usersIdChannel: {
            bsonType: [Number],
            description: 'User belong to this channel',
            maxLength: 255,
          },
        },
      },
    },
  });

   //create a channel for testing
   db.collection('channels').insertOne({
    name: "feedbacksMovies", group: 1, usersIdChannel: [1],
  })
}

const chat = (db) => {
  db.createCollection('chats', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: ['name', 'price'],
        properties: {
          _id: {
            bsonType: 'objectId',
          },
          name: {
            bsonType: 'string',
            description: 'Name of the product',
            maxLength: 50,
          },
          userId: {
            bsonType: 'objectId',
            description: 'chats',
            maxLength: 255,
          },
          message: {
            bsonType: 'string',
            description: 'message chat',
            maxLength: 255,
          },
          description: {
            bsonType: 'string',
            description: 'description',
            maxLength: 255,
          },
        },
      },
    },
  });

  //create a chats for testing
  db.collection('chats').insertOne({
  name: "feedbacksMovies", userId: 'redtye45etegd', message: 'hi, how everything is going',
  })
}


module.exports = { user, group, channel, chat };
 

