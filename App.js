import React, { useReducer, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';

const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: Date.now().toString(), task: action.payload }];
    case REMOVE_TODO:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(todoReducer, []); 
  const [task, setTask] = useState(''); 

  const handleAddTask = () => {
    if (task.trim() !== '') {
      dispatch({ type: ADD_TODO, payload: task });
      setTask(''); 
    }
  };

  const handleRemoveTask = (id) => {
    dispatch({ type: REMOVE_TODO, payload: id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Save" onPress={handleAddTask} />
      </View>

      <FlatList
        data={state}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRemoveTask(item.id)}>
            <View style={styles.todoItem}>
              <Text style={styles.todoText}>{item.task}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No tasks available. Add a task to get started!</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  todoItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  todoText: {
    fontSize: 18,
  },
});

export default App;
