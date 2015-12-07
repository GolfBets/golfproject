var React = require('react-native');

var {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image
} = React;

var Button = require('../common/button');
var Parse = require('parse/react-native')
module.exports = React.createClass({

  getInitialState: function(){
    return{
      username: '',
      password: '',
      passwordconfirmation: '',
      errorMessage: '',
    };
  },

  render: function(){
    return(
      <Image source={require('../../assets/bdg.jpeg')} style={styles.backgroundImage}>
        <View style = {styles.container}>
          <Text>Sign Up</Text>

          <Text style={styles.label}>Username:</Text>
          <TextInput
            value={this.state.username}
            onChangeText={(text)=>this.setState({username: text})}
            style= {styles.input}
          />
          <Text style={styles.label}>Password:</Text>
          <TextInput
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(text)=>this.setState({password: text})}
            style= {styles.input}
          />
          <Text style={styles.label}>Confirm Password:</Text>
          <TextInput
            secureTextEntry={true}
            value={this.state.passwordconfirmation}
            onChangeText={(text)=>this.setState({passwordconfirmation: text})}
            style= {styles.input}
          />
          <Text style={styles.label}>{this.state.errorMessage}</Text>
          <Button text={'Signup'} onPress={this.onSignupPress}/>
          <Button text={'I have an account'} onPress={this.onSigninPress}/>
        </View>
        <View style = {styles.container2}></View>
      </Image>
    );
  },
  onSignupPress: function(){
    if(this.state.password !== this.state.passwordconfirmation){
      return this.setState({errorMessage: 'Your passwords do not match'});
    }
    var user = new Parse.User();
    user.set('username', this.state.username);
    user.set('password', this.state.password);

    user.signUp(null, {
      success:(user) => {this.props.navigator.immediatelyResetRouteStack([{name: 'course'}]);},
      error:(user, error) => {this.setState({errorMessage: errormessage});}
    });
  },

  onSigninPress: function(){
    this.props.navigator.pop();
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container2:{
    flex: 1
  },
  backgroundImage: {
    backgroundColor: 'transparent',
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  label:{
    fontSize: 18,
    color: 'white'
  },
  label1:{
    fontSize: 14,
    color: 'white'
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "white",
    margin: 5,
    width: 200,
    alignSelf: 'center'
  }


});
