import auth from '@react-native-firebase/auth'
import firestore, { Timestamp } from '@react-native-firebase/firestore'

const CreateUser = (email, password, action) => {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => { action })
        .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
            } if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
            } console.error(error);
        });
}

const EditUser = async (id) => {
    const user = (await firestore().collection("Users").doc(id).get()).data()
    return user
}

const UpdateUser = async (fullName, phoneNumber, address, imageUrl) => {
    await firestore()
        .collection("Users").add({
            uid: auth().currentUser.uid,
            fullName: fullName,
            phoneNumber: phoneNumber,
            address: address,
            imageUrl: imageUrl,
        })
        .catch(error => {
            console.error(error);
        });
}

const UserSignIn = (email, password, action) => {
    auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => { action })
        .catch(error => {
            console.log("invalid credentials")
        });
}

const AddLogs = async (amountTransfer, availableCash, grandTotal) => {
    await firestore().collection("Logs").add({
        uid: auth().currentUser.uid,
        amountTransfer: amountTransfer,
        availableCash: availableCash,
        grandTotal: grandTotal,
        date: Timestamp.now()
    }).catch((error) => console.log(error))
}

async function deleteLogs(collection, key) {
    await firestore().collection(collection).doc(key).delete()
}

export {
    CreateUser,
    UserSignIn,
    EditUser,
    UpdateUser,
    AddLogs,
    deleteLogs
}
