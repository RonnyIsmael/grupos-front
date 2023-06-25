import { FlatList, Text } from 'react-native';
import repositories from '../data/repositories.js';
import RepositoryItem from '../components/RepositoryItem.jsx';
const Grupos = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={() => <Text> </Text>}
      renderItem={({ item: repo }) => (
        <RepositoryItem {...repo}></RepositoryItem>
      )}
    />
  );
};

export default Grupos;
