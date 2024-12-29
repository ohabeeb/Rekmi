import { FlatList, SafeAreaView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../constants/themes'
import { LogCards } from '../components'
import firestore from '@react-native-firebase/firestore'
import { getAuth } from '@react-native-firebase/auth'


export default function History() {
  const [logs, setLogs] = React.useState()
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    getLog()
  }, [logs])

  async function getLog() {
    const querySnapshot = (await firestore().collection('Logs').where("uid", "==", getAuth().currentUser.uid).get())
    let logs = []
    querySnapshot.forEach((queryDocumentSnapshot) => {
      logs.push({
        ...queryDocumentSnapshot.data(),
        key: queryDocumentSnapshot.id,
      })
    })
    setLogs(logs)
    setIsLoading(false)
  }

  function renderLogs() {
    function listHeaderComponent() {
      return (
        <View
          style={{
            paddingVertical: DIMENSIONS.padding,
          }}>
          <Text
            style={{
              fontSize: SIZES.large,
              fontWeight: 'bold',
            }}>All Logs</Text>
        </View>
      )
    }
    function renderItem({ item, index }) {

      // console.log(JSON.stringify(item, null, 3))
      const { seconds, nanoseconds } = item.date;

      // Convert seconds to milliseconds
      const dateObject = new Date(seconds * 1000 + nanoseconds / 1e6);

      // Format date and time
      const formattedDate = dateObject.toLocaleString(); // `toLocaleString()` includes both date and time

      return (
        <View >
          <LogCards
            key={item.uid}
            date={formattedDate}
            amountTransfer={item.amountTransfer}
            grandTotal={item.grandTotal}
            availableCash={item.availableCash} />
        </View>
      )
    }

    return (
      <View style={{ flex: 1 }}>
        {listHeaderComponent()}
        <FlatList
          data={logs}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No record yet!</Text>}
        />
      </View>
    )
  }
  if (isLoading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <ActivityIndicator size={"large"} color={COLOURS.primary} />
      </View>
    )

  }
  return (

    <SafeAreaView style={styles.container}>
      {renderLogs()}
    </SafeAreaView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.tetiary,
    paddingHorizontal: DIMENSIONS.padding,
  }
})