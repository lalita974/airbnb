import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Constants from "expo-constants";
import { FlatList } from "react-native";
import displayRating from "../utils/displayRating";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setItems(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        // Pour afficher la ligne de séparation entre chaque room
        ItemSeparatorComponent={() => <Text style={styles.line}></Text>}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Room", { id: item._id });
                }}
              >
                <View>
                  <ImageBackground
                    source={{ uri: item.photos[0].url }}
                    style={styles.photoHome}
                  >
                    <Text style={styles.price}>{item.price} €</Text>
                  </ImageBackground>
                </View>
                <View style={styles.secondBloc}>
                  <View style={styles.blocTitleAndRates}>
                    <Text numberOfLines={1}>{item.title}</Text>
                    <View style={styles.blocRates}>
                      <Text style={styles.stars}>
                        {displayRating(item.ratingValue)}
                      </Text>
                      <Text style={styles.reviews}>{item.reviews} reviews</Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: item.user.account.photo.url }}
                    style={styles.photoProfile}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  card: {
    paddingHorizontal: 15,
  },
  contentContainer: {
    alignItems: "center",
    gap: 30,
    justifyContent: "space-around",
  },
  photoHome: {
    height: 200,
    width: "100%",
  },
  price: {
    backgroundColor: "black",
    color: "white",
    width: 70,
    textAlign: "center",
    padding: 10,
    top: 130,
  },
  photoProfile: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  line: {
    backgroundColor: "lightgrey",
    height: 1,
    marginVertical: 10,
  },
  secondBloc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  blocTitleAndRates: {
    flex: 1,
    gap: 10,
  },
  stars: {
    flexDirection: "row",
  },
  blocRates: {
    flexDirection: "row",
    gap: 5,
  },
  reviews: {
    fontSize: 12,
    color: "grey",
  },
});
