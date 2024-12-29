import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { COLOURS, DIMENSIONS, SIZES } from '../constants/themes'

export default function FormInput({ value, placeholder, keyboardType, secureTextEntry, readOnly, onChangeText, label, multiline, numberOfLines, minHeight }) {
  return (
    <View>
      <Text style={{ fontSize: SIZES.medium, color: COLOURS.primary, fontWeight: '700' }}>{label}</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: COLOURS.primary,
          borderRadius: DIMENSIONS.radious,
          paddingHorizontal: DIMENSIONS.padding,
        }}>
        <TextInput
          value={value}
          numberOfLines={numberOfLines}
          multiline={multiline}
          placeholder={placeholder}
          cursorColor={COLOURS.primary}
          clearTextOnFocus={COLOURS.primary}
          autoCapitalize={false}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={onChangeText}
          readOnly={readOnly}
          style={{
            minHeight: minHeight,
            verticalAlign: 'top'
          }}
        />
      </View>
    </View>

  )
}

const styles = StyleSheet.create({})