import * as firebase from 'firebase';
import { Alert } from 'react-native';

export async function registration(email, password, lastName, firstName) {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    const { currentUser } = firebase.auth();

    const jsonData = JSON.stringify({
      userId: currentUser.uid,
      photoUrl: currentUser.photoUrl === undefined ? '' : currentUser.photoUrl,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      emailAddress: email.trim(),
    });

    const response = await fetch(
      'https://dealsy-user-function.azurewebsites.net/api/dealsycreateuserfunction?code=qzZq4TKyUIvHqaie300Sa4mXsOBhdrq3W/D54o3fKFzphNxYKkMyyw==',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: jsonData,
      },
    );

    const json = await response.json();
  } catch (error) {
    Alert.alert('Something went wrong!!!', error.message);
  }
}

export async function signIn(email, password) {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (err) {
    throw err;
  }
}

export async function logOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    Alert.alert('There is something wrong!', err.message);
  }
}
