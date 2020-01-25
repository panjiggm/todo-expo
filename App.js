import React, { useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import Header from "./components/Header";
import TodoItem from "./components/TodoItem";
import AddTodo from "./components/AddTodo";

export default function App() {
  const [todos, setTodos] = useState([
    { text: "play a game", key: "1" },
    { text: "drink a coffee", key: "2" },
    { text: "read a book", key: "3" },
    { text: "morning pray", key: "4" },
    { text: "feed the cat", key: "5" }
  ]);

  const pressHandler = key => {
    setTodos(prevTodo => {
      return prevTodo.filter(item => item.key !== key);
    });
  };

  const submitHandler = text => {
    if (text.length > 5) {
      setTodos(prevTodo => {
        return [{ text: text, key: Math.random().toString() }, ...prevTodo];
      });
    } else {
      Alert.alert("OOPS", "Todos must be over 5 chars long", [
        { text: "okesip", onPress: () => console.log("Alert Closed") }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    padding: 40
  },
  list: {
    marginTop: 20
  }
});
