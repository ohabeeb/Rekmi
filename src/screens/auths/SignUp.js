import { KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FormInput, TextButton } from '../../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOURS, DIMENSIONS, SIZES } from '../../constants/themes'
import auth from '@react-native-firebase/auth'

export default function SignUp({ navigation }) {

  const [fullname, setFullName] = React.useState("")
  const [signUpEmail, setSignUpEmail] = React.useState("")
  const [signUpPassword, setSignUpPassword] = React.useState("")
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] = React.useState(true)
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [secureTextEntry, setSecureTextEntry] = React.useState(true)

  function CreateUser(email, password) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.replace("BottomTabs")
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        } if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        } console.error(error);
      });
  }

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: DIMENSIONS.padding,
          // marginBottom: DIMENSIONS.marging,
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name={"chevron-left"}
            size={32}
            color={COLOURS.primary}
          />
        </TouchableOpacity>
      </View>
    )
  }
  function renderLogo() {
    return (
      <View
        style={{
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontSize: SIZES.large * 2,
            fontWeight: "bold",
            color: COLOURS.primary,
          }}>Rekmi</Text>
      </View>
    )
  }

  function renderForm() {
    return (
      <View
        style={{
          gap: 5,
          marginTop: DIMENSIONS.marging,
        }}>
        <Text
          style={{
            fontSize: SIZES.medium,
            color: COLOURS.primary,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>Create an account to continue.</Text>

        <View style={{
          gap: 10,
          elevation: 3,
          backgroundColor: COLOURS.tetiary,
          padding: DIMENSIONS.padding * 2,
          borderRadius: DIMENSIONS.radious,
        }}>

          <FormInput
            label={"Email"}
            placeholder={"Enter your email"}
            keyboardType={"email-address"}
            onChangeText={(val) => setSignUpEmail(val)}
          />
          <View>
            <FormInput
              label={"Password"}
              placeholder={"Enter your password"}
              secureTextEntry={secureTextEntry}
              onChangeText={(val) => setSignUpPassword(val)}
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
                size={22}
              />
            </TouchableOpacity>
          </View>
          <View>
            <FormInput
              label={"Confirm Password"}
              placeholder={"Confirm password"}
              secureTextEntry={secureTextEntry}
              onChangeText={(val) => setConfirmPassword(val)}
            />
            <TouchableOpacity
              onPress={() => setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword)}
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
                name={secureTextEntryConfirmPassword ? "eye" : "eye-off"}
                color={COLOURS.primary}
                size={22}
              />
            </TouchableOpacity>
          </View>
          <TextButton
            title={"Continue"}
            backgroundColor={COLOURS.primary}
            color={COLOURS.tetiary}
            onPress={() => {
              CreateUser(signUpEmail, signUpPassword)
            }}
          />
        </View>
      </View>
    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLOURS.tetiary }}>
      {renderHeader()}
      <KeyboardAvoidingView style={styles.container}>
        {renderLogo()}
        {renderForm()}
      </KeyboardAvoidingView>
    </View>


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