import React, { Component } from 'react';
// import logo from './logo.svg';
import classes from './App.css';
import Person from '../components/Persons/Person/Person';



class App extends Component {
  state = {
    persons : [
      {id:'1', name: 'Om', age: 28},
      {
        id: '2',
        name: 'Akash',
        age: 26
      },
      {
        id: '3',
        name: 'Someone Else',
        age: 21
      }
    ],
    someOther: 'some other value',
    showPersons: false
  }



  nameChangedHandler = (event, id) => {
    // Get the index for person id matching the passed id
    const personIndex = this.state.persons.findIndex(p => {
      return p.id == id;
    });

    // Get the person from the personIndex. we dont want to mutate the state directly so we use spread
    const person = {...this.state.persons[personIndex]};

    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    })
  }

  togglePersonHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow
    })
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();
    // Another method
    const persons = [...this.state.persons];

    persons.splice(personIndex,1); //removes one element from the array
    this.setState({
      persons
    })
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color:'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'

      }
    };
    let persons = null;
    if(this.state.showPersons){

      persons = (
        <div>
          {this.state.persons.map((person, index, id) => {
            return <Person
             key={person.id}
             click={this.deletePersonHandler.bind(this,index)}
             name={person.name}
             age={person.age}
             changed={(event) =>this.nameChangedHandler(event, person.id)} />
          })}
          {/* <Person name={this.state.persons[0].name} age={this.state.persons[0].age} /> */}

          {/* <Person name={this.state.persons[1].name} age={this.state.persons[1].age} changed={this.nameChangedHandler} /> */}

          {/* <Person name={this.state.persons[2].name} age={this.state.persons[2].age} /> */}

        </div>
      );
      style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor: 'salmon',
      //   color: 'black'
      // };
    }

    // if 2 persons then red, if 1 then red and bold using dynamic classes
    const assignedClasses = [];
    if(this.state.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if(this.state.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }


    return (
      <div className={classes.App}>
        <h1></h1>
        < p className = {
          assignedClasses.join(' ')
        } > Accounts and Details </p>
        <button style={style} onClick={this.togglePersonHandler} >Toggle Details</button>
        {persons}



        {/* <Person name="Jimbo" >My hobbies are horse riding.</Person> */}
      </div>
    );
  }
}

export default App;