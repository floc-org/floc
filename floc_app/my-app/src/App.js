import Card from './components/card';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useState } from 'react';

// Initializing connection to firebase.
firebase.initializeApp({
  apiKey: "AIzaSyDNwqSPGYOhvM0_EzM4GfGX6JG4FW1e1rc",
  authDomain: "floc-9ebcf.firebaseapp.com",
  projectId: "floc-9ebcf",
  storageBucket: "floc-9ebcf.appspot.com",
  messagingSenderId: "390997444310",
  appId: "1:390997444310:web:f93a11bcc2978a91a02b77",
  measurementId: "G-VWTE2QG3DN"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);  // When signed in, user is an object. When signed out, user is null. 

  // useEffect keeps checking for data fetch updates and then sets/updates the value of 'events' using the useState hook. 
  // Updates to the value of 'events' are reflected in the div rendered. 
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function fetchEventsData() {  // Declaring function to fetch events data from firestore. 
      const snapshot = await firestore.collection('events').get()  // Snapshot is a collection of documents/events, which are iterable.
      var events_inner = [];
      snapshot.forEach((event) => {  // Event is a single document.
        var id = event.id;
        var data = event.data();
        events_inner.push({  // Creating an object of key-value pairs that correspond to our document, and then inserting that object into the events array.  
          id: id,
          creation_timestamp: data.creation_timestamp,
          username: data.username,
          event_name: data.event_details.name,
          event_time: data.event_details.time,
          event_location: data.event_details.location,
          event_description: data.event_details.description,
        })
      })
      setEvents(events_inner);
    }
    fetchEventsData();  // Calling the function declared above. 
  });

  return (
    <div>
      {user ?
        <div>
          {typeof events[1] !== "undefined" ? console.log(events[1].username) : null}
          <Card
            image="https://images.fineartamerica.com/images/artworkimages/mediumlarge/2/1-cool-monkey-with-sunglasses-and-headphones-mister-tee.jpg"
            name= {typeof events[1] !== "undefined" ? events[1].username : null}
            activity= {typeof events[1] !== "undefined" ? events[1].event_name : null}
            time= '9AM'
            location= {typeof events[1] !== "undefined" ? events[1].event_location : null}
            description= {typeof events[1] !== "undefined" ? events[1].event_description : null}
          />
          <Card
            image="https://i.pinimg.com/736x/32/5c/fc/325cfc67933c173e35003b30546a88da.jpg"
            name='Ananya'
            activity='Tennis'
            time='4PM'
            location='Bay Club'
            description="Wham Bam!"
          />
          <SignOut />
        </div>
        : <SignIn />}
    </div>
  );
}

// Sign in component renders the initial page and authenticates user with their Google account. 
function SignIn() {
  function SignInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider);
  }
  return (
    <button className='signin-btn' onClick={SignInWithGoogle}>Sign in with Google</button>
  )
}

// Sign out component renders the sign out button and signs the user out when clicked.
function SignOut() {
  return (
    auth.currentUser && (
      <button className='signout-btn' onClick={() => auth.signOut()}>Sign out</button>
    )
  )
}

export default App;
