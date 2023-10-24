

# Firebase Security Rules

- Think of this as a big sofisticated switch statement
- {database} === default as each project has only database called default

## in a switch statement you write  

```javascript
	switch (path){
        case "/users/": 
            // do something here
        break;
        case "/users/user" :
            // do something here
        break;
        case "/users/user/me":
             // do something here
        break;
    }
```
---
- In firebase security rules rememeber its sophisticated <br/>
- Why ? because it's *RECURSIVE* <br/>
- Imagine a recursive switch statement like this 

```javascript
	switch (x){
        case "/users":
                //... do somethin in /users
                case "/user":
                //... do somethin in /users/user
                    case "/me":
                        //... do somethin in /users/user/me
                break;
    }
			 	

```
that's exactly how matching works in the security rules

---
```python 
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {  
    match /users/{user} {
      allow read, write: if true;
    }
  }
}
```

*that's actually /databases/{database}/documents/users/{user}*


---



## Request object
- request has both auth and resource fields
- resource field has many meta data fields the most important one is the data field
- the data field contains the data that you want to write
--- 
## Resource object
- resource field has many meta data fields the most important one is the data field
- the data field contains the data that you want to read or update

### request.resource Vs. resource
 - request.resource has many meta data fields the most important one is the data field that contains the data that you want to write
 - resource has many meta data fields the most important one is the data
 field that contains the data you want to read or update
 - resource originates as the result from the match clause
 - request.resource originates as the result from the request that is coming in 
 to the server from a specific actor

 - what if i send part of the data to be updated not the whole data form ? 
    <br/>let's imagine this :
    -  the new document (A) =>  request.resource.data = { name : "kerolous" , age : 24 }
    - the old document (B) => resource.data = { name : "koko" , age : 23 , occupation : "software engineer" }
    - hydration step takes place => missing fields gets hydrated
            - B hydrates A : { name : "koko" , age : 23 , occupation : "software engineer" } => { name : "kerolous" , age : 24 } => 
            { name : "kerolous" , age : 24 , occupation : "software engineer" }
---


