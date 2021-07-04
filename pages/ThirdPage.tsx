import React from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import { Image, ScrollView } from "react-native";
import { Linking } from 'react-native';
import { useQuery, gql } from "@apollo/client";


export const styles = StyleSheet.create({
    
  title_text: {
    fontSize: 25,
    fontWeight: "300",
    color: "yellow",
    fontFamily:'Inter',
    textShadowRadius: 1, 
    textShadowOffset:{width: 2, height: 2 },
    textShadowColor:'#000',
    textAlign:'left',
    paddingTop:50,
  },
  text: {
    color: "white",
    fontFamily:'Inter',
    paddingTop: 10,
  },
  link: {
    color: "yellow",
    fontFamily:'Inter',
  },
  image: {
    width: 180,
    height: 150,
    justifyContent: "center"
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
});


const GET_CITY = gql`
  query search($term: String!) 
  {
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

export const ThirdPage = ({route}) => {
  const { data, loading, error } = useQuery(GET_CITY, {
    variables: {term:route.params.paramKey},
  });

  if (loading || error) return null;


  return (
    <SafeAreaView style={{flex: 1, paddingTop:0, backgroundColor:'red'}}>
    <ScrollView style={{padding:50, paddingTop:0}}>
      {data?.search.business.map((item: any) => {
        return (
          <View>
            <Text style={styles.title_text}>{item.name}</Text>
            <Text><br></br></Text>
          <View key={item.id} style={{flexDirection:'row', justifyContent: 'space-between'}}>
            <Text style={styles.text}>Rating: {item.rating}</Text>
            <Text style={styles.text}>Price: {item.price}</Text>
          </View>
          <View>
          <View>
          <Text><br></br></Text>
          <Image
              source={{ uri: item.photos[0] }}
              style={{ height: 200, width: "100%" }}
          />
          </View>
          <Text><br></br></Text>
          <Text style={styles.text}>Location: {item.location.address1}</Text>
          <Text style={styles.text}>Phone: {item.phone}</Text>
          <Text><br></br></Text>
          <Text style={styles.link} onPress={ ()=>{ Linking.openURL(item.url)}}>Website</Text>
          <Text><br></br></Text>
          <Text style={styles.title_text}>Reviews</Text>
          <Text style={styles.text}>Número de ratings: {item.review_count}</Text>
          <Text><br></br></Text>
          </View>
          </View>
        );
      })}
    </ScrollView>
    </SafeAreaView>
  );
};

export default ThirdPage;


