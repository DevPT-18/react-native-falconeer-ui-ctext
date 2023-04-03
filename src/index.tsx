import React, { useState } from 'react'
import { type TextLayoutLine, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import type { CTextProps } from './interfaces/CTextprops'
import { isAndroid, isiOS } from './utils'
import { Tooltip } from './Tooltip'

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



  return (
      <View style={styles.container}>
    
  <Tooltip
        offset={10}
        trigger={
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              backgroundColor: '#e3e3e3'
            }}
          >
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
        }
      >
        <Tooltip.Content>
          <View style={styles.tooltip}>
            <Text style={styles.tooltipText}>{children}</Text>
          </View>
        </Tooltip.Content>
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
   tooltip: {
    justifyContent:'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#616161e6',
    borderRadius: 4
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
