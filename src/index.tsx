import React, { useState } from "react";
import { TextLayoutLine, Text } from "react-native";
import type { CTextProps } from "./interfaces/CTextprops";
import { isAndroid, isiOS } from "./utils/platform";
interface TextProperties {
  length: number;
  isTruncatedText: boolean;
}

export default function CText({
  style,
  numberOfLines = 1,
  children,
  readMoreText = "more",
  readLessText = "less",
  readMoreStyle = {color: "red", marginStart:20},
  readLessStyle = {color: "red"},
  ...props
}: CTextProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const [text, setText] = useState<TextProperties>({
    length: 0,
    isTruncatedText: false,
  });
  const getShowMoreStyle = () => {
    if(showMore){
      return readLessStyle;
    }
    return readMoreStyle;
  }
  
  function handleShowMoreText(textLayoutLines: TextLayoutLine[]) {
    let textLength = 0;
    if (textLayoutLines?.length > numberOfLines) {
      for (var line=0; line<numberOfLines; line++){
        textLength += textLayoutLines[line]!.text.length;
      }
      setText({ length: textLength, isTruncatedText: true });
      return;
    }
    setText({ length: children.length, isTruncatedText: false });

  }
  return (
    <>
    {/** 
        iOS always requires one element without a line number 
        to determine the number of lines.
       */}
      {isiOS && (
        <Text
          style={{height: 0}}
          onTextLayout={({ nativeEvent: { lines } }) => {
            if (text.length > 0) {
              return;
            }
            if (isiOS()) {
              handleShowMoreText(lines);
            }
          }}
        >
          {children}
        </Text>
      )}
      <Text
        style={style}
        numberOfLines={text.length === 0 ? numberOfLines : 0}
        onTextLayout={({ nativeEvent: { lines } }) => {
            if (text.length > 0) {
            return;
          }
          if (isAndroid()) {
            handleShowMoreText(lines);
          }
        }}
        {...props}
      >
        {text.isTruncatedText && !showMore && text.length !== 0
          ? `${children.slice(0, text.length - 10).trim()}...`
          : children}
        {text.isTruncatedText && (
          <Text
            style={getShowMoreStyle()}
            onPress={() => setShowMore(!showMore)}
          >
            {showMore ? readLessText : readMoreText}
          </Text>
        )}
      </Text>
    </>
  );
}