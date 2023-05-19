import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    if (email === "" || password === "") {
      setErrorMessage("Please fill all fields");
    } else {
      try {
        setErrorMessage("");
        const { data } = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );
        const userToken = data.token;
        setToken(userToken);
        alert("Vous êtes bien connecté");
      } catch (error) {
        console.log(error.response);
        setErrorMessage("La connexion a échoué");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.titleBloc}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setErrorMessage("");
            setEmail(text);
          }}
        />
        <View style={[styles.input, styles.password]}>
          <TextInput
            placeholder="password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setErrorMessage("");
              setPassword(text);
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <Feather name="eye-off" size={24} color="grey" />
            ) : (
              <Feather name="eye" size={24} color="grey" />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.titleBloc]}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            submit();
          }}
        >
          <Text style={styles.textButton}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.colorGrey}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    gap: 30,
    justifyContent: "space-around",
  },
  logo: {
    marginTop: 30,
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  titleBloc: {
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },

  input: {
    marginHorizontal: 40,
    borderBottomColor: "#EB5A62",
    borderBottomWidth: 1,
    height: 50,
    fontSize: 16,
  },
  password: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  errorMessage: {
    color: "#EB5A62",
  },

  button: {
    borderColor: "#EB5A62",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 60,
    borderRadius: 50,
  },

  colorGrey: {
    color: "#737373",
  },

  textButton: {
    fontSize: 16,
    fontWeight: "500",
  },
});
