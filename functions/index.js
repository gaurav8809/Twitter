const functions = require("firebase-functions");

var admin = require("firebase-admin");
var serviceAccount = require("./twitter-13dd2-firebase-adminsdk-c8olt-46d4095778.json");
let databaseURL = 'https://twitter-13dd2.firebaseio.com';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL
});

const db = admin.firestore();

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.sendNotification = functions.https.onCall(async (data) => {
  
  let { tokens, title, message, notification } = data;
  
  let result = await admin.messaging().sendToDevice(
    tokens, // ['token_1', 'token_2', ...]
    {
      data: {
        title,
        message
      },
    },
  );
  
  return {
    status: 200,
    ...result,
  };
});

exports.onNewMessage = functions.firestore
  .document('/chats/{id}')
  .onWrite(async (change, context) => {
    let before = change.before.data();
    let after = change.after.exists ? change.after.data() : null;
    
    if(after !== null)
    {
      let members = after.members;
      let messages = after.messages;
      let message = messages[messages.length - 1]
      let { senderID, receiverID } = message;
      
      let recRes  = await db.collection('users').doc(receiverID).get();
      let receiver  = recRes.data();
      let senRes = await db.collection('users').doc(senderID).get();
      let sender = senRes.data();
      
      if(receiver?.fcm_token.length > 0)
      {
        let result = await admin.messaging().sendToDevice(
          receiver.fcm_token,
          {
            data: {
              title: `New message from ${sender.profilename}`,
              message: message.messageText
            },
          },
        );
        return result;
      }
    }
    
    return null;
  });
