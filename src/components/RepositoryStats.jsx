import { View } from 'react-native';
import StyledText from './StyledText.jsx';

const RepositoryStats = props => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      <View>
        <StyledText align="center" fontWeight="bold">
          Stars
        </StyledText>
        <StyledText align="center">
          {parseThousands(props.stargazersCount)}
        </StyledText>
      </View>
      <View>
        <StyledText align="center" fontWeight="bold">
          Forks
        </StyledText>
        <StyledText align="center">{props.ForksCount}</StyledText>
      </View>
      <View>
        <StyledText align="center" fontWeight="bold">
          Review
        </StyledText>
        <StyledText align="center">{props.reviewCount}</StyledText>
      </View>
      <View>
        <StyledText align="center" fontWeight="bold">
          Rating
        </StyledText>
        <StyledText align="center">{props.ratingaverage}</StyledText>
      </View>
    </View>
  );
};

const parseThousands = value => {
  return value >= 1000 ? `${Math.round(value / 100) / 10}k` : String(value);
};
export default RepositoryStats;
