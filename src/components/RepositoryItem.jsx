import { View, StyleSheet, Image } from 'react-native';
import StyledText from './StyledText.jsx';
import RepositoryStats from './RepositoryStats.jsx';
import theme from '../theme.js';

const RepositoryItemHeader = props => (
  <View style={{ flexDirection: 'row', paddingBottom: 4 }}>
    <Image style={styles.image} source={{ uri: props.OownerAvatarUrl }} />
    <View style={{ paddingLeft: 4, flex: 1 }}>
      <StyledText fontWeight="bold" fontSize="subheading">
        {props.fullmame}
      </StyledText>
      <StyledText>{props.description}</StyledText>
      <StyledText style={styles.lenguage}> {props.language}</StyledText>
    </View>
  </View>
);
const RepositoryItem = props => (
  <View key={props.id} style={styles.container}>
    <RepositoryItemHeader {...props} />
    <RepositoryStats {...props} />
  </View>
);
const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 5,
    paddingTop: 5,
  },
  strong: {
    color: '#09f',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lenguage: {
    padding: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    borderRadius: 5,
    paddingEnd: 7,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
});
export default RepositoryItem;
