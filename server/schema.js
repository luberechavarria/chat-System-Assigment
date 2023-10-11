
const user = (db) => {
//   db.createCollection('users', {
//     validator: {
//       $jsonSchema: {
//         bsonType: 'object',
//         required: ['username', 'email'],
//         properties: {
//           _id: {
//             bsonType: 'objectId',
//           },
//           username: {
//             bsonType: 'string',
//             description: 'User Name',
//             maxLength: 30,
//           },
//           email: {
//             bsonType: 'string',
//             description: 'Address email',
//             maxLength: 30,
//           },
//           pwd: {
//             bsonType: 'string',
//             description: 'User password',
//             maxLength: 30,
//           },
//           roles: {
//             bsonType: "array",
//             items: {
//               bsonType: ["object", "string"],
//               properties: {
//                 groupAdmin: {
//                   bsonType: "array",
//                   items: {
//                     bsonType: "string"
//                   }
//                 }
//               }
//             }
//           },
//           groups: {
//             bsonType: "array",
//             items: {
//               bsonType: "string"
//             },
//             description: 'User groups in the chat',
//           },
//           login: {
//             bsonType: Boolean,
//             description: 'User login in the chat',
//           },
//           avatar: {
//             bsonType: 'string',
//             description: 'User avatar in the chat',
//           },
//         },
//       },
//     },
//   });
//  db.collection('users').insertOne({
//     username: "admin", email: 'admin@gmail.com', pwd: '123', roles: ['superAdmin'],
//     groups: [], login: false, avatar: ""
//   })
  //create a user for testing
  // db.collection('users').insertOne({
  //   id: 1, username: "Luber", email: '1@gmail.com', pwd: '123', roles: [{'groupAdmin': []}, 'superAdmin'],
  //   groups: [1, 3, 5], login: false, avatar: ""
  // })
  // db.collection('users').insertOne({
  //   id: 2, username: 'Marcela Cuellar', email: '2@gmail.com', pwd: '123', roles: [{'groupAdmin': [2, 4]}, 'groupAdmin'],
  //   groups: [1, 3, 5], login: false, avatar: ""
  // })
  // db.collection('users').insertOne({
  //   id: 3, username: 'Sarai Echavarria', email: '3@gmail.com', pwd: '123', roles: [{'groupAdmin': []}, 'user'],
  //   groups: [1, 4, 5], login: false, avatar: ""
  // })
  // db.collection('users').insertOne({
  //   id: 4, username: 'Juan', email: '4@gmail.com', pwd: '123', roles: [{'groupAdmin': []}, 'user'],
  //   groups: [1, 3], login: false, avatar: ""
  // })
  // db.collection('users').insertOne({
  //   id: 5, username: "Rosbert", email: '5@gmail.com', pwd: '123', roles: [{'groupAdmin': []}, 'user'],
  //   groups: [1, 2, 5], login: false, avatar: ""
  // })

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
          userAdmins: {
            bsonType: "array",
            items: {
              bsonType: 'objectId',
            },
            description: 'User admins in the group',
          },
          joinRequesters: {
            bsonType: "array",
            items: {
              bsonType: 'objectId',
            },
            description: 'Users requesting access to the group',
          },
          ownerId: {
            bsonType: 'objectId',
          },
        },
      },
    }
  });

   //create a group for testing
  // db.collection('groups').insertOne({
  //  id: 1, name: "Cinema", usersIdGroup: [2, 4, 6],
  // })
  // db.collection('groups').insertOne({
  //  id: 2, name: "Languages", usersIdGroup: [1, 2, 4, 5],
  // })
  // db.collection('groups').insertOne({
  //  id: 3, name: "Technology", usersIdGroup: [1, 2, 3],
  // })
  // db.collection('groups').insertOne({
  //  id: 4, name: "Brisbane", usersIdGroup: [4, 5],
  // })
  // db.collection('groups').insertOne({
  //  id: 5, name: "Music", usersIdGroup: [1, 2],
  // })
}

const channel = (db) => {
  // db.createCollection('channels', {
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: 'object',
  //       required: ['name'],
  //       properties: {
  //         _id: {
  //           bsonType: 'objectId',
  //         },
  //         name: {
  //           bsonType: 'string',
  //           description: 'Name of the product',
  //           maxLength: 50,
  //         },
  //         groupId: {
  //           bsonType: 'int',
  //           description: 'This is the id group that is belong this channel',
  //           maxLength: 255,
  //         },
  //         usersIdChannel: {
  //           bsonType: [Number],
  //           description: 'User belong to this channel',
  //           maxLength: 255,
  //         },
  //       },
  //     },
  //   },
  // });

  //create a channel for testing
  // db.collection('channels').insertOne({
  //   id: 1, name: "movies", group: 1, usersIdChannel: [1, 2, 3, 4, 5],
  // })
  // db.collection('channels').insertOne({
  //   id: 2, name: "reviews", group: 1, usersIdChannel: [1, 4],
  // })
  // db.collection('channels').insertOne({
  //   id: 3, name: "transformers", group: 1, usersIdChannel: [1, 3],
  // })
  // db.collection('channels').insertOne({
  //   id: 4, name: "spanish", group: 1, usersIdChannel: [2, 5],
  // })
  // db.collection('channels').insertOne({
  //   id: 5, name: "english", group: 1, usersIdChannel: [2],
  // })
  // db.collection('channels').insertOne({
  //   id: 6, name: "italian", group: 1, usersIdChannel: [2],
  // })
  // db.collection('channels').insertOne({
  //   id: 7, name: "computers", group: 1, usersIdChannel: [3],
  // })
  // db.collection('channels').insertOne({
  //   id: 8, name: "houses", group: 1, usersIdChannel: [4, 5],
  // })
   db.collection('channels').insertOne({
    id: 9, name: "Music", group: 4, usersIdChannel: [4, 5],
  })
}

const chat = (db) => {
  // db.createCollection('chats', {
  //   validator: {
  //     $jsonSchema: {
  //       bsonType: 'object',
  //       required: ['name', 'price'],
  //       properties: {
  //         _id: {
  //           bsonType: 'objectId',
  //         },
  //         name: {
  //           bsonType: 'string',
  //           description: 'Name of the product',
  //           maxLength: 50,
  //         },
  //         userId: {
  //           bsonType: 'int',
  //           description: 'chats',
  //           maxLength: 255,
  //         },
  //         message: {
  //           bsonType: 'string',
  //           description: 'message chat',
  //           maxLength: 255,
  //         },
  //         description: {
  //           bsonType: 'string',
  //           description: 'description',
  //           maxLength: 255,
  //         },
  //       },
  //     },
  //   },
  // });

  //create a chats for testing
  // db.collection('chats').insertOne({
  // id: 1, name: "feedbacksMovies", userId: '1', message: '11111 hi, how everything is going',
  // })
  // db.collection('chats').insertOne({
  //   id: 2, name: "feedbacksMovies", userId: '2', message: '2222222 hi, how everything is going',
  // })
  // db.collection('chats').insertOne({
  //   id: 3, name: "feedbacksMovies", userId: '3', message: '333333 hi, how everything is going',
  // })
}


module.exports = { user, group, channel, chat };
 

// db.users.find().toArray() 
// db.groups.find().toArray()
// db.channels.find().toArray()
// db.chats.find().toArray()