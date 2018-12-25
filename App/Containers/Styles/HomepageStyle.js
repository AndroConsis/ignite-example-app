import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row: {
    flex: 1,
    marginVertical: Metrics.baseMargin,
    marginRight: Metrics.baseMargin,
    justifyContent: "flex-start",
  },
  boldLabel: {
    fontWeight: 'bold',
    color: Colors.panther,
    marginBottom: Metrics.smallMargin
  },
  label: {
    color: Colors.panther
  },
  listContent: {
    marginTop: Metrics.baseMargin
  },
  column: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    borderRadius: Metrics.buttonRadius
  }
})
