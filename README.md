# react-native-falconeer-ui-ctext

Custom Text: It is just a wrapper component around React “Text” field that takes text to be displayed and displayLength as a property that trims the text to this length and adds “…” characters to it. displayLength includes these characters. That mean trimming should actually happen at displayLength-3. If the text is trimmed then it automatically shows full text in tooltip on hovering over the text. Tooltip is to be shown ONLY IF the text is trimmed. It takes styles as another property. It accept only plain text as children.

## Installation

```sh
npm install react-native-falconeer-ui-ctext
```

## Usage

```js
<OverlayProvider>
  <View style={styles.container}>
    <CText numberOfLines={1}>
      The universe is all of space and time and their contents including
      planets, stars, galaxies, and all other forms of matter and energy.
    </CText>
  </View>
</OverlayProvider>

// ...
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
