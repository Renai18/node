import React, { useState } from 'react';
import './App.css';

function App() {
  const [formInput, setFormInput] = useState('');
  const [list, setList] = useState([]);
  const [done, setDone] = useState([]);
  const [editingStates, setEditingStates] = useState([]);

  const handleInputChange = (e) => {
    setFormInput(e.target.value);
  };

  const addTodo = () => {
    if (list.includes(formInput)) {
      window.alert('Error: Task already exists.');
    } else {
      setList([...list, formInput]);
      setFormInput('');
      setEditingStates([...editingStates, false]);
    }
  };

  const handleDone = (index) => {
    if (done.includes(index)) {
      const newDone = done.filter((v) => v !== index);
      setDone(newDone);
    } else {
      setDone([...done, index]);
    }
  };

  const handleEdit = (index) => {
    const newEditingStates = [...editingStates];
    newEditingStates[index] = !newEditingStates[index];
    setEditingStates(newEditingStates);
    if (newEditingStates[index]) {
      setFormInput(list[index]);
    } else {
      setFormInput('');
    }
  };

  const saveEdit = (index) => {
    const newList = [...list];
    newList[index] = formInput;
    setList(newList);
    setEditingStates([...editingStates.slice(0, index), false, ...editingStates.slice(index + 1)]);
    setFormInput('');
  };

  const deleteTodo = (index) => {
    const newList = list.filter((_, i) => i !== index);
    setList(newList);
    setEditingStates([...editingStates.slice(0, index), ...editingStates.slice(index + 1)]);
  };

  return (
    <div className="app-container">
      <div className="todo-box">
        <h1>To-Do List App</h1>
        <input
          type="text"
          value={formInput}
          onChange={handleInputChange}
          placeholder="Enter task"
          disabled={editingStates.some((editing) => editing)}
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {list.map((item, index) => (
            <li
              key={index}
              onClick={() => handleDone(index)}
              className={done.includes(index) ? 'done' : ''}
            >
              {editingStates[index] ? (
                <>
                  <input
                    type="text"
                    value={formInput}
                    onChange={handleInputChange}
                  />
                  <button onClick={() => saveEdit(index)}>Save</button>
                </>
              ) : (
                <span>{item}</span>
              )}
              {!editingStates[index] && (
                <button
                  className="delete"
                  onClick={() => deleteTodo(index)}
                >
                  Delete
                </button>
              )}
              <button onClick={() => handleEdit(index)}>
                {editingStates[index] ? 'Cancel' : 'Edit'}
              </button>
            </li>
          ))}
        </ul>
      </div>g
    </div>
  );
}

export default App;
