import type { TextStyle, StyleProp, TextProps } from 'react-native'
export interface  CTextProps extends TextProps {
    style?: StyleProp<TextStyle>
    numberOfLines?: number
    children: string
}