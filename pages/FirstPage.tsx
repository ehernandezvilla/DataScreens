// React Native Pass Value From One Screen to Another Using React Navigation
// https://aboutreact.com/react-native-pass-value-from-one-screen-to-another-using-react-navigation/

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "top",
    padding: 210
  },

  image: {
    width: 180,
    height: 150,
    marginBottom: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: "300",
    marginBottom: 30,
    color: "yellow",
    fontFamily:'Inter',
    textShadowRadius: 1, 
    textShadowOffset:{width: 2, height: 2 },
    textShadowColor:'#000',
  },

  text: {
    fontSize: 15,
    fontWeight: "300",
    marginBottom: 30,
    color: "yellow",
    fontFamily:'Inter',
    textShadowRadius: 1, 
    textShadowOffset:{width: 2, height: 2 },
    textShadowColor:'#000',
  },

  buttonContainer: {
    backgroundColor: "yellow",
    padding: 8,
    borderRadius: 5,
    margin: 5,
    width: 100,
    height: 40,
  },

  input: {
    width: 250,
    height: 40,
    margin: 12,
    borderWidth: 1,
    backgroundColor: 'white',
    textAlign: "center",
  },

  buttonText: {
    color: "black",
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});


const FirstPage = ({navigation}) => {
  const [userName, setUserName] = useState('Search your food!');

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>FOOD.CRITICS</Text>
        <Image source={{ uri: 'https://www.webyya.cl/wp-content/uploads/2021/06/burguer.png'}} style={styles.image}/> 
        {/*Input to get the value from the user*/}
        <TextInput
          value={userName}
          onChangeText={(username) => setUserName(username)}
          placeholder={'Search your food!'}
          style={styles.input}
        />
        {/* On click of the button we will send the data as a Json
          From here to the Second Screen using navigation */}
        <View>
        <Button
          color="#c9c324"
          title="¡Busca tod@s las opciones!"
          //Button Title
          onPress={() =>
            navigation.navigate('SecondPage', {
              paramKey: userName,
            })
          }
        />
        <Text><br></br></Text>
         <Button
          color="#c9c324"
          title="¡Quiero más detalles!"
          //Button Title
          onPress={() =>
            navigation.navigate('ThirdPage', {
              paramKey: userName,
            })
          }>
        <Text style={{color: '#ff0000'}}></Text>
        </Button>
      </View>
      </View>
    </SafeAreaView>
  );
};

export default FirstPage;
