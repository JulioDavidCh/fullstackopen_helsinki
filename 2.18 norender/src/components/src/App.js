import React, { useState, useEffect } from 'react'
import DisplayHeader from "./DisplayHeader"
import DisplayInput from "./DisplayInput"
import DisplayEntries from "./DisplayEntries"
import phoneService from "./services/phoneService"

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(()=>{
    phoneService
    .getAll()
    .then(phoneNumbers =>{
      console.log("returning", phoneNumbers)
      setPersons(phoneNumbers)
    })
  },[])
  
  const changeHandlerName = (event) => setNewName(event.target.value)

  const changeHandlerNumber = (event) => setNewNumber(event.target.value)

  const changeHandlerFilter = (event) => setNewFilter(event.target.value)

  const submitHandler = (event) => {
      event.preventDefault()
      phoneService
      .getAll()
      .then(phoneNumbers =>{
        const allNumbers = [...phoneNumbers]
        console.log(allNumbers)
        if(allNumbers.some((entry)=> entry.name === newName)){
          if(window.confirm(`${newName} is already added to the phonebook, replace the older number with a new one?`)){
            const phoneToChangeId = allNumbers.find(entryName => entryName.name === newName).id
            const newPhoneNumber = {
              name:newName,
              number:newNumber
            }
            phoneService
            .replacePhone(phoneToChangeId, newPhoneNumber)
            .then(() =>{
              setNewName("")
              setNewNumber("")
              phoneService
              .getAll()
              .then(response =>{
                setPersons(response)
              })
            })
          }
        }else{
        const newPerson = {
            name:newName,
            number:newNumber
        }
          phoneService
          .postPhone(newPerson)
          .then(newEntry =>{
            setNewName("")
            setNewNumber("")
            setPersons(allNumbers.concat(newEntry))
          })
        }
      })
  }

  return (
    <div>
      <DisplayHeader message={"Phonebook"} />
      <DisplayInput message={"filter shown with: "} onChangeHandler={changeHandlerFilter} inputValue={newFilter} />
      <DisplayHeader message={"add a new"} />
      <form onSubmit={submitHandler}>
      <DisplayInput message={"name: "} onChangeHandler={changeHandlerName} inputValue={newName} />
      <DisplayInput value ={"number: "} onChangeHandler={changeHandlerNumber} inputValue={newNumber} />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <DisplayHeader message={"Numbers"} />
      <DisplayEntries names={persons} regVal={newFilter} />
    </div>
  )
}

export default App