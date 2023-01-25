import React from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState=(props)=>{
    const host = "http://localhost:5000" 
    const notesIntial =[]
    
    const [notes, setNotes] = useState(notesIntial)

    //Fetch all notes
    const getNotes= async ()=>{
      const response = await fetch(`${host}/api/notes/fetchallnotes`,{
        method: 'GET',
        headers:{
          'Content-Type' : 'application/json',
          'auth-token' : localStorage.getItem('token'),
        },
      });
      //console.log("+"+localStorage.getItem('token'));
      const note = await response.json();
      //console.log(note);
      setNotes(note)
    }

    //Add a note
    const addNote= async (id,title,description,tag)=>{
      console.log("adding new note")
      const response = await fetch(`${host}/api/notes/addnote`,{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json',
          'auth-token' :localStorage.getItem('token'),
        },
        body : JSON.stringify({title,description,tag}),
      });
      const note=await response.json();
      setNotes(notes.concat(note));
    }

    //Delete a note
    const deleteNote=async(id)=>{
      console.log(`deleting a note with id: ${id}`);

      const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
        method: 'DELETE',
        headers:{
          'Content-Type' : 'application/json',
          'auth-token' :localStorage.getItem('token'),
        },
      });
      const json =await response.json();
      const newNotes = notes.filter((note)=>{return note._id!==id})
      console.log(json);
      setNotes(newNotes);
    }

    //Edit a note
    const editNote= async (id,title,description,tag)=>{
      const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type' : 'application/json',
          'auth-token' :localStorage.getItem('token'),
        },
        body : JSON.stringify({title,description,tag}),
      });
      const json=await response.json();
      for(let index=0;index<notes.length;index++){
        const element = notes[index];
        if(element._id === id){
          notes[index].title=title;
          notes[index].description = description;
          notes[index].tag = tag;
          break;
        }
      }
      console.log(json);
      setNotes(notes);
    }
    return (
        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;