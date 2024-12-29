import { SafeAreaView, StyleSheet, Text, Pressable, KeyboardAvoidingView, Alert, ScrollView, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../constants/themes'
import { FormInput, Logo, TextButton } from '../components'
import { AddLogs } from '../helpers/FirebaseHelper'

export default function Add({ navigation }) {
  const [actions, setActions] = React.useState("open")
  const [amountTransfer, setAmountTransfer] = React.useState(0)
  const [availableCash, setAvailableCash] = React.useState(0)
  const [grandTotal, setGrandTotal] = React.useState(0)

  function renderLogo() {
    return (
      <View style={{
        // height: 100,
         alignItems: 'center', 
         justifyContent: 'center', 
         marginTop: 50,
         }}>
        <Logo />
      </View>
    )
  }

  function renderForm() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
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
            }}> Add Reconds</Text>
          <FormInput
            label={"Transfer"}
            placeholder={"Enter total amount transfer"}
            keyboardType={"numeric"}
            value={amountTransfer}
            onChangeText={(val) => setAmountTransfer(val)} />
          <FormInput
            label={"Cash"}
            placeholder={"Enter available cash"}
            keyboardType={"numeric"}
            value={availableCash}
            onChangeText={(val) => setAvailableCash(val)} />
          <FormInput
            label={"Grand Total"}
            placeholder={"Enter available cash"}
            keyboardType={"numeric"}
            value={grandTotal}
            onChangeText={(val) => setGrandTotal(val)} />
          <TextButton
            title={"Countinue"}
            backgroundColor={COLOURS.primary}
            color={COLOURS.tetiary}
            onPress={() => {
              AddLogs(amountTransfer, availableCash, grandTotal)
                .then(() => {
                  Alert.alert("Status", "Logs Added Successfully")
                  
                }).catch(
                  (error) => {
                    console.log("Error has occured")
                  }
                )
              navigation.navigate("Home")
            }} />
        </View>
      </View>
    )
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
      {renderLogo()}
      {renderForm()}
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.padding * 2,
    backgroundColor: COLOURS.tetiary,
  }
})