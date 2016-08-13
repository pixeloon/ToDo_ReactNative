import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    return ({
      tasks: ['Learn ReactNative', 'Make Breakfast', 'Drop off Mail'],
      completedTasks: [],
      task: ''
    })
  },

  renderList(tasks) {
    // return individual rows  based on the tasks
    return (
      tasks.map((task, index) => {
        return (
          <View key={index} style={styles.task}>
            <Text>
              {task}
            </Text>
            <TouchableOpacity 
            onPress={() => {this.completeTask(index)}}
            >
                <Text>
                  &#10003;
                </Text>
            </TouchableOpacity>
          </View>
          )
      })
      )

  },
  renderCompleted(tasks){
    return (
    tasks.map((task, index) => {
      return (
        <View key={index} style={styles.task}>
          <Text  style={styles.completed}>
            {task}
          </Text>
            <TouchableOpacity 
            onPress={() => {this.deleteTask(index)}}
            >
                <Text>
                  &#10005;
                </Text>
            </TouchableOpacity>
        </View>
        )
      
      })
    )

  },

  completeTask(index){
    console.log('Complete Task:', this.state.tasks[index]);
    let tasks = this.state.tasks;
    tasks = tasks.slice(0,index).concat(tasks.slice(index+1));

    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.concat([this.state.tasks[index]]);
    this.setState({
      tasks:tasks,
      completedTasks: completedTasks
    });

  },
  addTask() {
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({tasks:tasks})
  },
    deleteTask(index) {
    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.slice(0, index).concat(completedTasks.slice(index+1))
    this.setState({completedTasks:completedTasks})
  },


  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.header}>
          ToDo Master
        </Text>
        <TextInput 
        style = {styles.input} 
        placeholder = 'Add a Task' 
        onChangeText={(text) => {
          this.setState({task: text});
        }} 
        onEndEditing={() => this.addTask()}
        />
        {this.renderList(this.state.tasks)}
        {this.renderCompleted(this.state.completedTasks)}
      </View>
      )
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    margin: 30,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18
  },
  input: {
    height: 60,
    borderWidth:1,
    borderColor: 'black',
    borderRadius: 5,
    textAlign: 'center',
    margin: 10
  },
  task: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  completed: {
    color: '#777',
    textDecorationLine: 'line-through'
  }
})
