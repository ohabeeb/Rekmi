import { View, Text, StyleSheet, Image, Alert, SafeAreaView, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../constants/themes'
import auth, { getAuth } from '@react-native-firebase/auth'
import { UpdateUser } from '../helpers/FirebaseHelper'
import { FormInput, TextButton } from '../components'
import firestore from '@react-native-firebase/firestore'
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


export default function Profile({ navigation }) {
    const [modalToggle, setModalToggle] = React.useState(false)
    const [fullname, setFullname] = React.useState("")
    const [email, setEmail] = React.useState(auth().currentUser.email)
    const [phoneNumber, setPhoneNumber] = React.useState()
    const [contactAddress, setContactAddress] = React.useState("")
    const [imageUrl, setImageUrl] = React.useState(null)
    const [user, setUser] = React.useState()

    function SignOut() {
        auth().signOut().then(navigation.replace("SignIn"))
    }
    async function getUser() {
        const user = await firestore().collection("Users").where("uid", "==", getAuth().currentUser.uid).get()
        setUser(user.docs[0].data())
    }
    React.useEffect(() => {
        getUser()
    }, [])

    async function getImageFromGalary() {
        const result = await launchImageLibrary({ mediaType: "photo" })
        console.log(result)
    }

    function renderProfilePhoto() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    marginTop: DIMENSIONS.marging * 3,
                }}>
                <View
                    style={{
                        width: 100,
                        height: 100,
                        borderRadius: 100,
                        backgroundColor: COLOURS.transparent,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    {user?.imageUrl === null ? <MaterialCommunityIcons name={"account-circle-outline"} size={40} color={COLOURS.gray} /> : <Image
                        source={{ uri: user?.imageUrl }}
                        resizeMode='contain'
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 100,
                        }} />
                    }


                </View>
            </View>
        )
    }
    function renderActionButtons() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: DIMENSIONS.marging * 2,
                    gap: 10,
                }}>
                <TouchableOpacity
                    onPress={() => {
                        setModalToggle(true)
                    }}
                    style={{
                        padding: DIMENSIONS.padding,
                        borderRadius: DIMENSIONS.radious,
                        backgroundColor: COLOURS.primary,
                    }}>
                    <Text
                        style={{
                            color: COLOURS.tetiary,
                        }}>Edit Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => SignOut()}
                    style={{
                        padding: DIMENSIONS.padding,
                        backgroundColor: COLOURS.primary,
                        borderRadius: DIMENSIONS.radious,
                    }}>
                    <Text
                        style={{
                            color: COLOURS.tetiary,
                            textAlign: 'center',
                        }}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        )
    }
    function renderProfileInfo() {
        return (
            <View style={{ marginVertical: DIMENSIONS.marging }}>
                <View style={styles.profileContainer}>
                    <Text style={styles.profileHeader}>Fullname:</Text>
                    <Text>{user?.fullName}</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.profileHeader}>Email:</Text>
                    <Text>{email}</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Text style={styles.profileHeader}>Phone Number:</Text>
                    <Text>{user?.phoneNumber}</Text>
                </View>
                <View style={{ paddingHorizontal: DIMENSIONS.padding }}>
                    <Text style={styles.profileHeader}>Contact Address:</Text>
                    <Text>{user?.address}</Text>
                </View>
            </View>
        )
    }
    function renderForm() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: DIMENSIONS.padding,
                }}>
                <View
                    style={{
                        gap: 6,
                    }}>
                    <Text
                        style={{
                            fontSize: SIZES.xlarge,
                            textAlign: 'center',
                            color: COLOURS.primary,
                            fontWeight: 'bold',
                        }}> Edit Profile</Text>
                    <TouchableOpacity
                        onPress={() => { getImageFromGalary() }}
                        style={{
                            width: 30,
                            height: 30,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <MaterialCommunityIcons
                            name={"image-plus"}
                            size={25}
                            color={COLOURS.gray} />
                    </TouchableOpacity>
                    <FormInput
                        label={"Fullname"}
                        value={fullname}
                        placeholder={"Enter fullname"}
                        onChangeText={(val) => setFullname(val)} />
                    <FormInput
                        label={"Email"}
                        value={email}
                        readOnly={true}
                    />
                    <FormInput
                        label={"Phone number"}
                        value={phoneNumber}
                        placeholder={"Enter phone number"}
                        keyboardType={"numeric"}
                        onChangeText={(val) => setPhoneNumber(val)} />
                    <FormInput
                        label={"Contact Address"}
                        value={contactAddress}
                        placeholder={"Enter contact address"}
                        multiline={true}
                        numberOfLines={3}
                        minHeight={80}
                        onChangeText={(val) => setContactAddress(val)} />
                    <TextButton
                        title={"Update"}
                        backgroundColor={COLOURS.primary}
                        color={COLOURS.tetiary}
                        onPress={() => {
                            UpdateUser(fullname, phoneNumber, contactAddress, imageUrl)
                                .then(() => {
                                    Alert.alert("Status", "Profile updated successfully")
                                    setModalToggle(false)

                                }).catch(
                                    (error) => {
                                        console.log("Error has occured", error)
                                    }
                                )
                        }} />
                </View>
            </View>
        )
    }

    function renderModal() {
        return (
            <Modal
                visible={modalToggle}
                animationType="slide"
                transparent={true}>
                <TouchableWithoutFeedback
                    onPress={() => setModalToggle(false)}
                    style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        top: 0,
                        bottom: 0,
                    }}>
                    <View
                        style={{
                            flex: 1,
                            backgroundColor: "rgba(0, 0, 0, 0.3)"
                        }}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: COLOURS.white,
                                marginTop: 100,
                                borderTopRightRadius: 30,
                                borderTopLeftRadius: 30,
                            }}>
                            <ScrollView style={{ flex: 1, }} showsVerticalScrollIndicator={false}>
                                {renderForm()}
                            </ScrollView>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderProfilePhoto()}
            {renderActionButtons()}
            {renderProfileInfo()}
            {renderModal()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLOURS.tetiary,
        paddingHorizontal: DIMENSIONS.padding,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        padding: DIMENSIONS.padding,
        borderBottomWidth: 1,
        borderColor: COLOURS.transparent,
    },
    profileHeader: {
        fontSize: SIZES.large,
        fontWeight: 'bold'
    }
})