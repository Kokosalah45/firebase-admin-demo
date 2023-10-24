import express from 'express'
import admin from 'firebase-admin'
import {getAuth} from 'firebase-admin/auth'
import serviceAccount from './serviceAccountKey.json' assert { type: "json" };
import cors from 'cors'
const db = {
    users : [
        {
            uid : '71a815d5-c428-4821-85f4-9bc92cefc91b',
            name : 'kerolous',
            age : 23,
            scopes : [
                'users.read',
                'users.write',
                'users.list',
                'users.delete',
                'users.update'
            ]
        }
    ]
}



 admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const authService = getAuth()



const app = express()
app.use(cors())
app.get('/' , (req , res) => {
    res.send('hello world')
})

app.post('/token' , (req  , res) => {

    const {uid , scopes} = db.users[0]

   authService
    .createCustomToken(uid, {scopes})
    .then((customToken) => {
    
        res.json({customToken})
    });
  
})

app.listen(3000 , () => {
    console.log('listening on port 3000')
})



