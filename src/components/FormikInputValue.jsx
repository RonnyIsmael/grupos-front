import StyledTextInput from './StyledTextInput.jsx';
import { useField } from 'formik';
import StyledText from './StyledText.jsx';
import { StyleSheet } from 'react-native';
import theme from '../theme.js';

const styles = StyleSheet.create({
  error: {
    color: theme.colors.error,
    fontSize: 11,
    marginBottom: 20,
    marginTop: -5,
  },
});

const FormikInputValue = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <>
      <StyledTextInput
        error={meta.error}
        onChangeText={value => helpers.setValue(value)}
        value={field.value}
        {...props}
      />
      {meta.error && <StyledText style={styles.error}>{meta.error}</StyledText>}
    </>
  );
};
export default FormikInputValue;
