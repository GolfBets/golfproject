var React = require('react-native');

var {
  View,
  StyleSheet,
  Text,
  Image,
  ListView
} = React;

var Parse  = require('parse/react-native');
var Button = require('../common/button');
var Api  = require('../common/api');

module.exports = React.createClass({
  getInitialState: function(){
    return {
      user: null,
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  },

  componentWillMount: function(){
    Parse.User.currentAsync()
      .then((user)=>{this.setState({user: user});})
  },

  componentDidMount: function(){
    Api('courses')
      .then((data) =>{
        console.log("componentDidMount", data)
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(data),
          loaded: true,
        });
      })
      .done();
  },

  render: function(){
    if (!this.state.user || !this.state.loaded){
      return <Text>Loading...</Text>
    }
    var username = this.state.user.get('username');
    console.log(this.state.user);
    return (
      <View style = {styles.container}>
        <View style= {styles.container}>
          <Text style = {styles.label}>Welcome Back {username}!</Text>
          <Text style = {styles.label}>Select your course below</Text>
        </View>
        <View style = {styles.container2}>
          <ListView
            dataSource = {this.state.dataSource}
            renderRow = {this.renderCourse}
            style = {styles.ListView}
          />
        </View>
      </View>
    );
  },

  renderCourse: function(courses){
      return (
        <View style={styles.container}>
          <Text style = {[styles.listView, styles.label]}>{courses.name}</Text>
        </View>
      );
  },
});

var styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
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
  listView: {
    paddingTop: 20,
    backgroundColor: 'transparent',
  },
  label: {
    fontSize: 18,
    color: 'white'
  }
});
//
// var React = require("react-native");
//
// var {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TextInput,
//     TouchableHighlight,
// } = React;
// var GameSetup = require("./GameSetup");
//
// var CourseSetup = React.createClass({
//     getInitialState: function(){
//       return {
//         username: this.props.username,
//         coursename: "",
//         par: "",
//         hcp: "",
//         coursepar: [],
//         coursehcp:[],
//         holecounter: 1,
//       }
//     },
//
//
//   //  <Image source={require('./bcg.jpeg')} style={styles.backgroundImage}>
// // logic to check login info here  - then render welcome user and enter course name annd info
//     render: function() {
//       console.log(this.state)
//         return (
//           <Image source={require('./bdg.jpeg')} style={styles.backgroundImage}>
//             <View style={styles.container}>
//               <View >
//
//                   <TextInput
//                     placeholderTextColor="white"
//                     placeholder="Enter Course Name"
//                     onChange={(event) => this.setState({coursename: event.nativeEvent.text})}
//                     style={styles.formInput1}
//                     value={this.state.coursename} />
//
//               </View>
//               <View>
//                 <View>
//                   <Text style = {styles.heading}>Hole {this.state.holecounter}</Text>
//                 </View>
//                 <View style = {styles.flowright}>
//                 <Text style = {styles.subheading}>Enter Par</Text>
//                 <Text style = {styles.subheading}>Enter HCP</Text>
//                 </View>
//                 <View style = {styles.flowright}>
//                     <TextInput
//                         placeholderTextColor="white"
//                         placeholder="par"
//                         onChange={(event) => this.setState({par: event.nativeEvent.text})}
//                         style={styles.formInput}
//                         value={this.state.par} />
//
//                     <TextInput
//                         placeholder="hcp"
//                         placeholderTextColor="white"
//                         onChange={(event) => this.setState({hcp: event.nativeEvent.text})}
//                         style={styles.formInput}
//                         value={this.state.hcp} />
//                 </View>
//
//                 <TouchableHighlight underlayColor="gray" onPress={(this.onSubmitPressed)} style={styles.button}>
//                   <Text style={styles.buttonText}>Save Hole Info</Text>
//                 </TouchableHighlight>
//               </View>
//             </View>
//           </Image>
//
//
//         );
//     },
//     onSubmitPressed: function() {
//       var par = this.state.par;
//       var hcp = this.state.hcp;
//       var counter = this.state.holecounter+1
//       this.setState({
//         coursepar: this.state.coursepar.concat([par]),
//         coursehcp: this.state.coursehcp.concat([hcp]),
//         holecounter: counter,
//         par: "",
//         hcp:"",
//       })
//       if (this.state.holecounter === 19){
//         this.props.navigator.push({
//                 title: "Game Setup",
//                 component: GameSetup,
//                 passProps: {username: this.state.username},
//             });
//       }
//     },
//
// });
//
// var styles = StyleSheet.create({
//     container: {
//
//       padding: 30,
//       marginTop: 65,
//       alignItems: "stretch",
//
//     },
//     flowright: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-around',
//     },
//     backgroundImage: {
//     backgroundColor: 'transparent',
//     flex: 1,
//     alignSelf: 'stretch',
//     width: null,
//     },
//     formInput1: {
//         height: 36,
//         padding: 10,
//         marginRight: 5,
//         marginBottom: 5,
//         marginTop: 5,
//         flex: 1,
//         textAlign:'center',
//         fontSize: 18,
//         borderWidth: 1,
//         borderColor: 'white',
//         borderRadius: 8,
//         color: "white",
//         opacity: .3,
//         backgroundColor: 'black',
//     },
//     formInput: {
//         height: 36,
//         padding: 10,
//         marginRight: 5,
//         marginBottom: 5,
//         marginTop: 5,
//         flex: 1,
//         textAlign:'center',
//         fontSize: 18,
//         borderWidth: 1,
//         borderColor: 'white',
//         borderRadius: 8,
//         color: "white",
//         opacity: .3,
//         backgroundColor: 'black',
//     },
//     heading: {
//         marginTop: 5,
//         marginBottom: 5,
//         fontSize: 30,
//         textAlign: 'center',
//         color: 'white',
//     },
//     subheading: {
//         marginTop: 5,
//         marginBottom: 5,
//         fontSize: 20,
//         textAlign: 'center',
//         color: 'white',
//     },
//
//
//     button: {
//         height: 36,
//         flex: 1,
//         backgroundColor: 'black',
//         borderColor: 'white',
//         borderWidth: 1,
//         borderRadius: 8,
//         marginTop: 10,
//         justifyContent: "center"
//     },
//     buttonText: {
//         fontSize: 18,
//         color: 'white',
//         alignSelf: 'center'
//     },
// });
//
// module.exports = CourseSetup
