import { auth , db } from './db'
import './reset.css'
import './style.css'
import {  setPersistence, signInWithCustomToken, browserLocalPersistence } from "firebase/auth";
import { collection , addDoc , doc , getDoc , getDocs , deleteDoc } from 'firebase/firestore'



type UserDetail = {
  id : string,
  newUserName : string,
  newUserOccupation : string,
  newUserAge : string
}



const userDetailTemplate = (userDetail : UserDetail ) => {

  const {newUserAge , newUserName , newUserOccupation ,id} = userDetail
  return `
  <div data-user-details=${JSON.stringify({newUserAge , newUserName , newUserOccupation ,id}) }  class="user-details-container">

  <h4 >id : ${id}</h4>
  <ul class="user-details-container__details">
    <li class="details__item">
      <p>name</p>
      <p>${newUserName}</p>
    </li>
    <li class="details__item">
      <p>occupation</p>
      <p>${newUserOccupation}</p>
       </li>
    <li class="details__item">
      <p>age</p>
      <p>${newUserAge}</p>
    </li>
  </ul>
  <div class="user-details-container__actions">
    <button class="delete">Delete</button>
    <button class="edit">Edit</button>
  </div>
  </div>

  `
}


const signInForm = document.getElementById('signin-form') as HTMLFormElement
const addUserForm = document.getElementById('user-crud-form') as HTMLFormElement
const userSearchForm = document.getElementById('user-search-form') as HTMLFormElement;
const userSearch = document.querySelector('input[name="userId"]') as HTMLInputElement
const userListBtn = document.getElementById('user-list-btn') as HTMLButtonElement;
const newUserName = document.querySelector('input[name="newUserName"]') as HTMLInputElement
const newUserOccupation = document.querySelector('input[name="newUserOccupation"]') as HTMLInputElement
const newUserAge = document.querySelector('input[name="newUserAge"]') as HTMLInputElement
const signoutBtn = document.getElementById('signout');
const userResultContainer = document.getElementById('user-result');
console.log(addUserForm)




document.addEventListener('DOMContentLoaded' , ()=> {

  const usersCollection = collection(db , 'users')

  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    setPersistence(auth, browserLocalPersistence)
  .then(async () => {
    const res = await fetch('http://localhost:3000/token', {
      method : "POST",
      body : JSON.stringify({
          email : 'destro@gmail.com',
          password : '123',
          name : 'kerolous',
          
      },
    
      )
    })
    const {customToken} = await res.json()
    return signInWithCustomToken(auth, customToken);
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log({errorCode, errorMessage})
  });

  signoutBtn?.addEventListener('click' , () => {
   
    auth.signOut().then(() => {  userResultContainer!.innerHTML = ""; alert('SIGN OUT Successfull')})
  })
  
  })

  addUserForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    await addDoc(usersCollection , {newUserName : newUserName.value , newUserOccupation : newUserOccupation.value , newUserAge : newUserAge.value})
  })

  userSearchForm.addEventListener('submit', async (e) => { 
    e.preventDefault();
    const docRef = doc(db , 'users' , userSearch.value);
    try{
      const docSnap = await getDoc(docRef);
      alert(JSON.stringify(docSnap.data()))
    }catch(e){console.error(e)}
  } )

  userListBtn.addEventListener('click' , async () => {
    try{
      const docSnap = await getDocs(usersCollection);
       userResultContainer!.innerHTML = ""
      docSnap.forEach(doc =>{
        const userDetailTemp = userDetailTemplate({id : doc.id ,  ...doc.data()});
        userResultContainer!.innerHTML += userDetailTemp
      })
    }catch(e : unknown){alert((e as Error).message)}
  })

  userResultContainer?.addEventListener('click' , (e) => {
    const {target} = e
    if (!target){
      return
    }
    const t = target as HTMLElement;
    
    if(t.classList.contains('delete')){
      const userDetails = JSON.parse(t.parentElement?.parentElement?.dataset.userDetails || "") as UserDetail;
        deleteDoc(doc(db , 'users' , userDetails.id))

    }

    if(t.classList.contains('edit')){
   
      const userDetails = JSON.parse(t.parentElement?.parentElement?.dataset.userDetails || "") as UserDetail;
      newUserName.value = userDetails.newUserName;
      newUserOccupation.value = userDetails.newUserOccupation;
      newUserAge.value = userDetails.newUserAge;

    }
  })




})





