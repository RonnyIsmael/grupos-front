import { TextInput, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 1,
    borderTopWidth: 0.1,
    borderEndWidth: 0.6,
    borderStartWidth: 0.1,
    borderRadius: 5,
    borderColor: '#999',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  error: {
    borderColor: 'red',
  },
});

const StyledTextInput = ({ style = {}, error, ...props }) => {
  const inputStyle = [styles.textInput, style, error && styles.error];
  return (
    <View style={inputStyle}>
      <TextInput {...props} />
    </View>
  );
};

export default StyledTextInput;
