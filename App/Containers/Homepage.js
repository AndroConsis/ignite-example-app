import React from 'react'
import { View, Text, FlatList, Image } from 'react-native'
import { connect } from 'react-redux'
import HomepageActions from '../Redux/HomepageRedux';
import { Images } from '../Themes'
import Divider from '../Components/Divider';

// More info here: https://facebook.github.io/react-native/docs/flatlist.html

// Styles
import styles from './Styles/HomepageStyle'

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

  /* ***********************************************************
  * STEP 2
  * `renderRow` function. How each cell/row should be rendered
  * It's our best practice to place a single component here:
  *
  * e.g.
    return <MyCustomCell title={item.title} description={item.description} />
  *************************************************************/
  renderRow ({item}) {
    return (
      <View style={styles.column}>
      <Image style={styles.thumb} source= {{uri: item.restaurant.thumb}}/>
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
  // Render a header?
  renderHeader = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Header - </Text>

  // Render a footer?
  renderFooter = () =>
    <Text style={[styles.label, styles.sectionHeader]}> - Footer - </Text>

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

  render () {
    return (
      <View style={styles.container}>
      <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          ListEmptyComponent={this.renderEmpty}
          ItemSeparatorComponent={this.renderSeparator}
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
