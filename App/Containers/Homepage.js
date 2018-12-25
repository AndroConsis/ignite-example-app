import React from 'react'
import { View, Text, FlatList, Image, Platform, Dimensions, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import HomepageActions from '../Redux/HomepageRedux';
import { Images, Colors } from '../Themes'
import Divider from '../Components/Divider';
import Header from '../Components/Header';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/HomepageStyle'

const SCREEN_HEIGHT = Dimensions.get('window').height;

const IS_IPHONE_X = SCREEN_HEIGHT === 825 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = 88;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const headerStyles = StyleSheet.create({
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: Colors.transparent,
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.transparent,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  titleStyle: {
    color: Colors.snow,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

class Homepage extends React.PureComponent {
  /* ***********************************************************
  * STEP 1
  * This is an array of objects with the properties you desire
  * Usually this should come from Redux mapStateToProps
  *************************************************************/
  state = {
    dataObjects: this.props.payload ? this.props.payload.restaurants : []
  }

  componentDidMount() {
    const pos = this.props.navigation.state.params;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.payload != null) {
      this.setState({
        dataObjects: nextProps.payload.restaurants
      })
    }
  }

  renderNavBar = () => (
    <View style={headerStyles.navContainer}>
      <View style={headerStyles.statusBar} />
      <View style={headerStyles.navBar} />
    </View>
  )

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow({ item }) {
    return (
      <View style={styles.column}>
        <Image style={styles.thumb} source={{ uri: item.restaurant.thumb }} />
        <View style={styles.row}>
          <Text style={styles.boldLabel}>{item.restaurant.name}</Text>
          <Text style={styles.label}>{item.restaurant.cuisines}</Text>
        </View>
      </View>
    )
  }

  /* ***********************************************************
  * STEP 3
  * Consider the configurations we've set below.  Customize them
  * to your liking!  Each with some friendly advice.
  *************************************************************/

  // Show this when data is empty
  renderEmpty = () =>
    <Text style={styles.label}> - Nothing to See Here - </Text>

  renderSeparator = () => <Divider />

  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => `${index}`

  // How many items should be kept im memory as we scroll?
  oneScreensWorth = 20

  // extraData is for anything that is not indicated in data
  // for instance, if you kept "favorites" in `this.state.favs`
  // pass that in, so changes in favorites will cause a re-render
  // and your renderItem will have access to change depending on state
  // e.g. `extraData`={this.state.favs}

  // Optimize your list if the height of each item can be calculated
  // by supplying a constant height, there is no need to measure each
  // item after it renders.  This can save significant time for lists
  // of a size 100+
  // e.g. itemLayout={(data, index) => (
  //   {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  // )}

  renderContent = () => (<View style={{ flex: 1 }}>
    <FlatList
      contentContainerStyle={styles.listContent}
      data={this.state.dataObjects}
      renderItem={this.renderRow}
      keyExtractor={this.keyExtractor}
      initialNumToRender={this.oneScreensWorth}
      ListEmptyComponent={this.renderEmpty}
      ItemSeparatorComponent={this.renderSeparator}
    /></View>)


  render() {
    return (
      <View style={styles.container}>
        <Header
          headerMinHeight={HEADER_HEIGHT}
          headerMaxHeight={250}
          extraScrollHeight={20}
          navbarColor={Colors.primary}
          title="Around You"
          titleStyle={headerStyles.titleStyle}
          backgroundColor={Colors.background}
          renderNavBar={this.renderNavBar}
          renderContent={this.renderContent}
          contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.background }}
          containerStyle={{ flex: 1, backgroundColor: Colors.background }}
        />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    payload: state.homepage.payload
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getHomepage: dispatch(HomepageActions.homepageRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
