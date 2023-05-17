import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Constants from "expo-constants";

export default function SignUpScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confimedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async () => {
    if (
      email === "" ||
      username === "" ||
      description === "" ||
      password === "" ||
      confimedPassword === ""
    ) {
      setErrorMessage("Please fill all fields");
      console.log("1");
    } else if (password !== confimedPassword) {
      setErrorMessage(
        "Le mot de passe confirmé ne correspond pas au mot de passe saisi"
      );
      console.log("2");
    } else {
      console.log("3");
      setErrorMessage("");
      try {
        const { response } = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );
        console.log(data);
        alert("Le compte a été créé avec succès");
      } catch (error) {
        console.log(error.response);
        setErrorMessage("L'inscription a échoué");
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
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setErrorMessage("");
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrorMessage("");
          }}
        />
        <TextInput
          style={styles.inputDescription}
          placeholder="Describe yourself in few words..."
          value={description}
          multiline={true}
          textAlignVertical="top"
          onChangeText={(text) => {
            setDescription(text);
            setErrorMessage("");
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage("");
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry={true}
          value={confimedPassword}
          onChangeText={(text) => {
            setConfirmedPassword(text);
            setErrorMessage("");
          }}
        />
      </View>

      <View style={[styles.titleBloc]}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TouchableOpacity
          style={styles.button}
          onpress={() => {
            submit();
            setErrorMessage("");
          }}
        >
          <Text style={styles.textButton}>Sign up</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <Text style={styles.colorGrey}>
            Already have an account ? Sign in
          </Text>
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
    alignItems: "center",
    flex: 1,
    justifyContent: "space-around",
  },
  logo: {
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

  inputDescription: {
    marginVertical: 30,
    marginHorizontal: 40,
    borderColor: "#EB5A62",
    borderWidth: 1,
    height: 100,
    fontSize: 16,
    paddingLeft: 10,
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
