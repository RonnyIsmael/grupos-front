import { Text, StyleSheet } from 'react-native';
import theme from '../theme.js';

const styles = StyleSheet.create({
  container: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 25,
    fontFamily: theme.fontFamily,
  },
});

const TitlePage = props => {
  return <Text style={styles.container}> {props.name} </Text>;
};

export default TitlePage;
