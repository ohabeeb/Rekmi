import { StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Alert } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../../constants/themes'
import { FormInput, Logo, TextButton } from '../../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import auth from '@react-native-firebase/auth'


export default function SignIn({ navigation }) {

  const [email, setEmail] = React.useState(null)
  const [password, setPassword] = React.useState(null)
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)


  const UserSignIn = (email, password) => {

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => navigation.replace("BottomTabs"))
      .catch(error => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert("Status", "Invalid credentials")
        } if (error.code === 'auth/network-request-failed') {
          Alert.alert("Status", "No internet connection")
        } console.error(error);
      });
  }

  function renderLogo() {
    return (
      <View style={{ marginVertical: DIMENSIONS.marging }}>
        <Logo />
        <View
          style={{
            marginVertical: DIMENSIONS.marging,
          }}>
          <Text
            style={{
              fontSize: SIZES.small,
              color: COLOURS.primary,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Sign In or create an account to continue.</Text>
        </View>
      </View>
    )
  }

  function renderForm() {
    return (
      <View
        style={{
          padding: DIMENSIONS.padding * 1.5,
          backgroundColor: COLOURS.tetiary,
          borderRadius: DIMENSIONS.radious,
          elevation: 2
        }}>
        <View style={{ gap: 10 }}>
          <FormInput
            label={"Email"}
            placeholder={"Enter your email"}
            keyboardType={"email-address"}
            onChangeText={(val) => setEmail(val)}
          />
          <View>
            <FormInput
              label={"Password"}
              placeholder={"Enter your password"}
              secureTextEntry={secureTextEntry}
              onChangeText={(val) => setPassword(val)}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntry(!secureTextEntry)}
              style={{
                position: 'absolute',
                right: 10,
                bottom: 8,
                width: 30,
                height: 30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <MaterialCommunityIcons
                name={secureTextEntry ? "eye" : "eye-off"}
                color={COLOURS.primary}
                size={24}
              />
            </TouchableOpacity>
          </View>
          <TextButton
            title={"Sign In"}
            backgroundColor={COLOURS.primary}
            color={COLOURS.tetiary}
            onPress={() => { UserSignIn(email, password) }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: SIZES.small,
                textAlign: 'center',
                textDecorationLine: 'underline',
                color: COLOURS.primary,
              }}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }


  return (
    <KeyboardAvoidingView style={styles.container} >
      {renderLogo()}
      {renderForm()}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: DIMENSIONS.padding,
    backgroundColor: COLOURS.tetiary,
  }
})