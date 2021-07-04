import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import { Image, ScrollView } from "react-native";
import { useQuery, gql } from "@apollo/client";


export const styles = StyleSheet.create({
    
  title_text: {
    fontSize: 16,
    fontWeight: "300",
    color: "yellow",
    fontFamily:'Inter',
    textShadowRadius: 1, 
    textShadowOffset:{width: 2, height: 2 },
    textShadowColor:'#000',
    textAlign:'center',
  },
  text: {
    color: "white",
    fontFamily:'Inter',
    justifyContent: 'space-between',
    padding: 5,
    paddingEnd: 10,
  },
  image: {
    width: 180,
    height: 150,
    textAlign:'center',
    alignItems: 'center',
    justifyContent: 'center',

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
    textAlign:'center',
  },
});


const GET_CITY = gql`
  query search($term: String!) {
    search(location: "Santiago ", term: $term) {
      business {
        name
        id
        photos
        hours {
          hours_type
          is_open_now
        }
        review_count
        location {
          address1
        }
        url
        phone
        reviews {
          rating
          text
        }
        categories {
          title 
        }
        price
        rating
      }
    }
  }
`;

export const SecondPage = ({route}) => {
  const { data, loading, error } = useQuery(GET_CITY, {
    variables: {term:route.params.paramKey},
  });

  if (loading || error) return null;


  return (
    <SafeAreaView style={{flex: 1, paddingTop:20, backgroundColor:'red'}}>
    <Text style={styles.title}>FOOD<br></br>CRITICS</Text>
    <Image style={styles.image} source={{ uri: 'https://www.webyya.cl/wp-content/uploads/2021/06/burguer.png'}}/>
    <Text style={styles.title_text}>Restaurantes o locales</Text>
    <ScrollView style={{padding:10, paddingTop:20}}>
      {data?.search.business.map((item: any) => {
        return (
          <View key={item.id} style={{flexDirection:'row', justifyContent: 'space-between'}}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.location.address1}</Text>
          <Text style={styles.text}>{item.rating}</Text>
        </View>
        );
      })}
    </ScrollView>
    </SafeAreaView>
  );
};

export default SecondPage;
