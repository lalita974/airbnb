import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import displayRating from "../utils/displayRating";
import MapView, { Marker } from "react-native-maps";

export default function RoomScreen() {
  const { params } = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${params.id}`
        );
        // console.log(data);
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
    <View style={{ flex: 1 }}>
      <View>
        <ImageBackground
          source={{ uri: items.photos[0].url }}
          style={styles.photoHome}
        >
          <Text style={styles.price}>{items.price} €</Text>
        </ImageBackground>
      </View>
      <View style={styles.secondBloc}>
        <View style={styles.blocTitleAndRates}>
          <Text numberOfLines={1}>{items.title}</Text>
          <View style={styles.blocRates}>
            <Text style={styles.stars}>{displayRating(items.ratingValue)}</Text>
            <Text style={styles.reviews}>{items.reviews} reviews</Text>
          </View>
        </View>
        <Image
          source={{ uri: items.user.account.photo.url }}
          style={styles.photoProfile}
        />
      </View>
      <Text style={styles.description} numberOfLines={3}>
        {items.description}
      </Text>
      <MapView
        // La MapView doit obligatoirement avoir des dimensions
        style={styles.map}
        initialRegion={{
          latitude: items.location[1],
          longitude: items.location[0],
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: items.location[1],
            longitude: items.location[0],
          }}
          title={items.title}
          description={items.description}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  photoHome: {
    height: 300,
    width: "100%",
  },
  price: {
    backgroundColor: "black",
    color: "white",
    width: 70,
    textAlign: "center",
    padding: 10,
    top: 230,
  },
  secondBloc: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 5,
    paddingHorizontal: 10,
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
  photoProfile: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },
  description: {
    paddingHorizontal: 10,
    fontSize: 12,
  },
  map: {
    flex: 1,
    marginTop: 20,
  },
});
