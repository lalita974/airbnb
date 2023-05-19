import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Constants from "expo-constants";
import { Feather } from "@expo/vector-icons";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confimedPassword, setConfirmedPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  const submit = async () => {
    if (
      email === "" ||
      username === "" ||
      description === "" ||
      password === "" ||
      confimedPassword === ""
    ) {
      setErrorMessage("Please fill all fields");
    } else if (password !== confimedPassword) {
      setErrorMessage(
        "Le mot de passe confirmé ne correspond pas au mot de passe saisi"
      );
    } else {
      setErrorMessage("");
      try {
        const { data } = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
          {
            email: email,
            username: username,
            description: description,
            password: password,
          }
        );
        const userToken = data.token;
        setToken(userToken);
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
        <View style={[styles.input, styles.password]}>
          <TextInput
            placeholder="password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setErrorMessage("");
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
        <View style={[styles.input, styles.password]}>
          <TextInput
            placeholder="confirm password"
            secureTextEntry={!showConfirmedPassword}
            value={confimedPassword}
            onChangeText={(text) => {
              setConfirmedPassword(text);
              setErrorMessage("");
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setShowConfirmedPassword(!showConfirmedPassword);
            }}
          >
            {showConfirmedPassword ? (
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
    gap: 30,
    justifyContent: "space-around",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginTop: 30,
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
