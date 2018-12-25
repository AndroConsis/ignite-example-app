import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'
import RoundedButton from '../Components/RoundedButton';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  askLocationAndNavigate = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      this.props.navigation.navigate("Homepage", { ...pos })
    })
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.launch} style={styles.logo} />
          </View>

          <View style={styles.section} >
            <Text style={styles.sectionText}>
              Awesome!!
            </Text>
            <RoundedButton
              text={"Go Ahead"}
              onPress={this.askLocationAndNavigate}
            />
          </View>

        </ScrollView>
      </View>
    )
  }
}
