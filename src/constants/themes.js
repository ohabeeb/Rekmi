import { Dimensions } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'
const { width, height } = Dimensions.get('window')

const COLOURS = {
    primary: "#064535",
    secondary: "#EA7406",
    tetiary: "#EFEFE5",
    white: "#FFFFFF",
    black: "#000000",
    google: "#E92F1C",
    gray: "gray",
    transparent: "rgba(0, 0, 0, 0.2)"
}

const SIZES = {
    xsmall: RFValue(12),
    small: RFValue(14),
    medium: RFValue(16),
    large: RFValue(18),
    xlarge: RFValue(20),
}

const DIMENSIONS = {
    width: width,
    height: height,
    radious: RFValue(12),
    padding: RFValue(12),
    marging: RFValue(12),
}

export { COLOURS, SIZES, DIMENSIONS }