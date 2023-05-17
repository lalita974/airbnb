import React, { useState } from "react";
import {
  Button,
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

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.titleBloc}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.title}>Sign Up</Text>
      </View>
      <View style={styles.marginTop}>
        <TextInput
          style={styles.input}
          placeholder="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
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
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="confirm password"
          secureTextEntry={true}
          value={confimedPassword}
          onChangeText={(text) => {
            setConfirmedPassword(text);
          }}
        />
      </View>

      <View style={[styles.titleBloc]}>
        <TouchableOpacity style={styles.button}>
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
    paddingTop: 30,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  titleBloc: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
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

  marginTop: {
    marginTop: 70,
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
