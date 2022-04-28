import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	collection,
	writeBatch,
	query,
	getDocs,
} from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBavBzPDl46Z-bWbUmsHO4yYfMXkxt2wBA',
	authDomain: 'clothing-store-d5623.firebaseapp.com',
	projectId: 'clothing-store-d5623',
	storageBucket: 'clothing-store-d5623.appspot.com',
	messagingSenderId: '832604443339',
	appId: '1:832604443339:web:3113e67cbc88e2ddd6414e',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// provider for google auth
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();

export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

// connects to firebase db
export const fsDB = getFirestore();
export const addCollectionAndDocuments = async (
	collectionKey,
	objectsToAdd
) => {
	const collectionRef = collection(fsDB, collectionKey);
	const batch = writeBatch(fsDB);
	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object);
	});
	await batch.commit();
	console.log('done batch');
};
export const getCategoriesAndDocuments = async () => {
	const collectionRef = collection(fsDB, 'categories');
	const q = query(collectionRef);

	const querySnapshot = await getDocs(q);
	return querySnapshot.docs.map((docSnapshot) => docSnapshot.data());
};
export const createUserDocfromAuth = async (userAuth, additionalInfo) => {
	if (!userAuth) return;
	const userDocRef = doc(fsDB, 'users', userAuth.uid);
	const userSnapShot = await getDoc(userDocRef);

	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInfo,
			});
		} catch (error) {
			console.log('error creating the user', error.message);
		}
	}
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
	onAuthStateChanged(auth, callback);
