import { ActivityIndicator, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../constants/themes'
import { LogCards } from '../components'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore'
import { getAuth } from '@react-native-firebase/auth'


export default function Home({ navigation }) {
  const [isLoading, setIsLoading] = React.useState(true)
  const [logs, setLogs] = React.useState(null)
  const [user, setUser] = React.useState()
  const [profileImage, setProfileImage] = React.useState(user?.imageUrl)

  React.useEffect(() => {
    getLog()
  }, [])

  async function getLog() {
    const querySnapshot = (await firestore().collection('Logs').where("uid", "==", getAuth().currentUser.uid).get())
    let logs = []
    querySnapshot.forEach((queryDocumentSnapshot) => {
      logs.push({
        ...queryDocumentSnapshot.data(),
        key: queryDocumentSnapshot.id,
      })
    })

    setLogs(logs.slice(-5))
    setIsLoading(false)
  }

  React.useEffect(() => {
    getUser()
  }, [])

  async function getUser() {
    const user = await firestore().collection("Users").where("uid", "==", getAuth().currentUser.uid).get()
    setUser(user.docs[0].data())
  }

  function renderUserBasicDetails() {
    return (
      <View style={{ marginTop: DIMENSIONS.marging }}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 15,
        }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 100,
              backgroundColor: COLOURS.tetiary,
              alignContent: 'center',
              // justifyContent: 'center',
            }}>
            {
              profileImage == null &&
              <MaterialCommunityIcons name={"account-circle-outline"} size={40} color={COLOURS.gray} />
            }
            {
              <Image
                source={{ uri: profileImage }}
                resizeMethod='contain'
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 100,
                }} />
            }
          </View>

          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: SIZES.large,
                  fontWeight: 'bold',
                }}>Hello!</Text>
              <Text
                style={{
                  fontSize: SIZES.large,
                  fontWeight: '500',
                }}>{user?.fullName}</Text>
            </View>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
              }}>
              <MaterialCommunityIcons
                name={"bell"}
                size={SIZES.xlarge * 1.4}
                color={COLOURS.primary} />
              <View
                style={{
                  position: 'absolute',
                  bottom: 20,
                  right: - 1.5,
                  width: 16,
                  height: 16,
                  borderRadius: 100,
                  backgroundColor: 'red',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{ color: COLOURS.white, fontSize: SIZES.xsmall, textAlign: 'center' }}>0</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }

  function renderWalletDetials() {
    return (
      <View
        style={{
          paddingHorizontal: DIMENSIONS.padding * 2,
          paddingVertical: DIMENSIONS.padding * 2,
          marginTop: DIMENSIONS.marging * 3,
          marginBottom: DIMENSIONS.marging,
          marginHorizontal: DIMENSIONS.marging,
          backgroundColor: COLOURS.primary,
          justifyContent: 'center',
          borderRadius: DIMENSIONS.radious,
          borderWidth: 1,
          borderColor: COLOURS.tetiary,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: SIZES.xsmall,
                color: COLOURS.tetiary,
              }}>Current Balance</Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: SIZES.medium,
                color: COLOURS.tetiary,
              }}>₦0</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: SIZES.xsmall,
                color: COLOURS.tetiary,
              }}>Total Balance</Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: SIZES.medium,
                color: COLOURS.tetiary,
              }}>₦0</Text>
          </View>
        </View>


      </View>
    )
  }

  function renderRecentHistory() {
    function renderItem({ item }) {
      const { seconds, nanoseconds } = item.date;

      // Convert seconds to milliseconds
      const dateObject = new Date(seconds * 1000 + nanoseconds / 1e6);

      // Format date and time
      const formattedDate = dateObject.toLocaleString(); // `toLocaleString()` includes both date and time

      return (
        <LogCards
          copy={item.copy}
          copyClosed={item.copyClosed}
          print={item.print}
          printClosed={item.printClosed}
          amountTransfer={item.amountTransfer}
          availableCash={item.availableCash}
          grandTotal={item.grandTotal}
          date={formattedDate} />
      )
    }
    function listHeaderComponent() {

      return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: DIMENSIONS.marging }}>
          <Text
            style={{
              fontSize: SIZES.xlarge,
              fontWeight: 'bold',
              color: COLOURS.primary,
            }}>Resent Logs</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("History")}>
            <Text
              style={{
                fontSize: SIZES.small,
              }}>View all</Text>
          </TouchableOpacity>
        </View>
      )
    }
    if (isLoading) {
      return <ActivityIndicator />
    }
    return (
      <View style={{
        flex: 1,
      }}>

        <FlatList
          ListHeaderComponent={listHeaderComponent}
          data={logs}
          keyExtractor={item => item.key}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No entry yet!</Text>}
        />
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderUserBasicDetails()}
      {renderWalletDetials()}
      {renderRecentHistory()}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: DIMENSIONS.padding,
    backgroundColor: COLOURS.white,
  }
})