import { StyleSheet } from 'react-native';
import { dimensions, colors } from '../../../../styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: dimensions.indent,
    paddingBottom: 0,
    backgroundColor: colors.inbox.messageBackgroundColor,
    height: dimensions.indent * 6.5,
    width: '100%',
    marginTop: dimensions.indent * 0.75,
  },

  photoContainer: {},
  image: {
    width: 70,
    height: 53,
    borderRadius: dimensions.borderRadius,
  },
  requestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  request: {
    textAlign: 'center',
  },

  messageMainInfo: {
    flex: 1,
    marginLeft: dimensions.indent * 0.75,
  },
  headerMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: dimensions.indent / 2,
  },

  text: {
    overflow: 'hidden',
    borderBottomWidth: StyleSheet.hairlineWidth * 2,
    borderBottomColor: colors.inbox.borderColor,
    paddingBottom: dimensions.indent / 2,
  },
  chat: {
    borderBottomWidth: 0,
  },
  rentInfo: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default styles;
