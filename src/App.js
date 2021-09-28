import { useState } from "react"

function NoteListItem(props) {
  const incompleteStyle = {}
  const completeStyle = { 
    textDecoration: "line-through"
  }

  function handleComplete() {
    props.completeNote(props.index)
  }

  function handleDelete() {
    props.deleteNote(props.index)
  }

  return (
    <li>
      <div>
        <div style={props.note.complete ? completeStyle : incompleteStyle}>
          {props.note.description}
        </div>
        <div><button type="button" onClick={handleComplete}>Complete</button></div>
        <div><button type="button" onClick={handleDelete}>Delete</button></div>
      </div>
    </li>
  )
}

function NoteList(props) {
  return (
    <ul>
      {props.notes.map((note, i) => {
        return (
         <NoteListItem 
            note={note} 
            key={i}
            index={i}
            completeNote={props.completeNote}
            deleteNote={props.deleteNote}
          />
        )
      })}
    </ul>
  )
}

function NoteForm(props) {
  const [description, setDescription] = useState("")
  const [errorMessage, setMessage] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (description.length > 3) {
      props.addNote(description)
      setDescription("")
      setMessage(null)
    } else {
      setMessage("Please enter more than 3 characters")
    }
  }

  return (
    <div>
      {errorMessage && (
        <p>{errorMessage}</p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          name="description" 
          type="text" 
          value={description}
          onChange={e => setDescription(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function App() {
  const [notes, setNotes] = useState([
    {description: "Do the laundry", complete: false},
    {description: "Wash the car", complete: false},
    {description: "Do some coding", complete: false},
  ])

  function addNote(description) {
    setNotes([
      ...notes,
      {description, complete: false}
    ])
  }

  function completeNote(index) {
    setNotes([
      ...notes.slice(0, index),
      {...notes[index], complete: true},
      ...notes.slice(index+1),
    ])
  }

  function deleteNote(index) {
    setNotes(notes.filter((_, i) => i !== index))
  }

  return (
    <div>
      <NoteForm addNote={addNote} />
      <NoteList 
        notes={notes} 
        completeNote={completeNote} 
        deleteNote={deleteNote}
        />
    </div>
  );
}

export default App;
