import React, { useState } from 'react'
import { type TextLayoutLine, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import type { CTextProps } from './interfaces/CTextprops'
import { isAndroid, isiOS } from './utils/platform'
import Tooltip from './Tooltip'

interface TextProperties {
  length: number
  isTruncatedText: boolean
}

export default function CText ({
  style,
  numberOfLines = 1,
  children,
  ...props
}: CTextProps) {
  const [isVisible, toggle] = React.useReducer((state) => !state, false)
  const [text, setText] = useState<TextProperties>({
    length: 0,
    isTruncatedText: false
  })

  function handleShowMoreText (textLayoutLines: TextLayoutLine[]) {
    let textLength = 0
    if (textLayoutLines?.length > numberOfLines) {
      for (let line = 0; line < numberOfLines; line++) {
        textLength += textLayoutLines[line]!.text.length
      }
      setText({ length: textLength, isTruncatedText: true })
      return
    }
    setText({ length: children.length, isTruncatedText: false })
  }

  const renderContent = React.useCallback(() => {
    return (
      <TouchableOpacity style={styles.tooltipContainer} onPress={toggle}>
        <Text style={styles.tooltipText} >
          {children}
        </Text>
      </TouchableOpacity>
    )
  }, [])

  return (
      <View style={styles.container}>
      <Tooltip
        position="bottom"
        renderContent={renderContent}
        isVisible={isVisible}
        onDismiss={toggle}
        pointerStyle={styles.pointer}
        pointerColor="green">
        <TouchableOpacity onPress={toggle} style={styles.newFeature}>
        {isiOS && (
        <Text
          style={{ height: 0 }}
          onTextLayout={({ nativeEvent: { lines } }) => {
            if (text.length > 0) {
              return
            }
            if (isiOS()) {
              handleShowMoreText(lines)
            }
          }}>
          {children}
        </Text>
        )}
      <Text
        style={style}
        numberOfLines={text.length === 0 ? numberOfLines : 0}
        onTextLayout={({ nativeEvent: { lines } }) => {
          if (text.length > 0) {
            return
          }
          if (isAndroid()) {
            handleShowMoreText(lines)
          }
        }}
        {...props}
      >
        {text.isTruncatedText && text.length !== 0
          ? `${children.slice(0, text.length - 10).trim()}...`
          : children}
      </Text>
        </TouchableOpacity>
      </Tooltip>
    </View>
  )
}

const styles = StyleSheet.create({
  newFeature: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  newFeatureText: {
    flex: 1,
    fontSize: 16,
    color: 'red'
  },

  pointer: { width: 16, height: 8 },

  tooltipContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    backgroundColor: 'green'
  },
  tooltipText: {
    fontSize: 12,
    color: 'white'
  }
})
