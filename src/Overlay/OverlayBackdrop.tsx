import React from 'react'
import { StyleSheet, Pressable, PressableProps } from 'react-native'
import { OverlayContext } from './context'
import { isWeb } from 'src/utils'

type IOverlayCloseButtonProps = PressableProps;

const defaultStyles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    ...(isWeb() ? { cursor: 'default' } : {}),
  },
})

export function OverlayBackdrop({ style, ...rest }: IOverlayCloseButtonProps) {
  const { onClose } = React.useContext(OverlayContext)

  return (
    <Pressable
      accessible={false}
      focusable={false}
      style={StyleSheet.flatten([defaultStyles.wrapper, style])}
      onPress={onClose}
      {...rest}
    />
  )
}
