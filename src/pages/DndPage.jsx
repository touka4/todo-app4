import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './style.css'; 

// Состояние для хранения колонок с задачами
const DndPage = () => {
  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'pollute ur head' },
        { id: '2', content: 'make mistakes' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [],
    },
    done: {
      name: 'Done',
      items: [],
    },
    blocked: {
      name: 'Blocked',
      items: [],
    },
  });

  const [draggedItem, setDraggedItem] = useState(null);  // Состояние для хранения перетаскиваемого элемента
  const [sourceColumnId, setSourceColumnId] = useState(null);  // Состояние для хранения ID колонки, из которой перетаскивается элемент
  const [newTaskContent, setNewTaskContent] = useState('');  // Состояние для хранения текста новой задачи
  const [selectedColumn, setSelectedColumn] = useState('todo');  // Состояние для хранения выбранной колонки для добавления новой задачи

  const handleDragStart = (item, columnId) => {
    setDraggedItem(item);
    setSourceColumnId(columnId);
  };

  const handleDrop = (destinationColumnId) => {
    if (!draggedItem) return;

    const sourceColumn = columns[sourceColumnId];
    const destColumn = columns[destinationColumnId];
    const sourceItems = [...sourceColumn.items]; //копия массива
    const destItems = [...destColumn.items]; //копия массива

    const newSourceItems = sourceItems.filter(item => item.id !== draggedItem.id); //исключение перетаскиваемого элемента
    const newDestItems = [...destItems, draggedItem];

    setColumns({
      ...columns,
      [sourceColumnId]: { ...sourceColumn, items: newSourceItems },
      [destinationColumnId]: { ...destColumn, items: newDestItems },
    });

    //Сброс состояния перетаскиваемого элемента
    setDraggedItem(null);
    setSourceColumnId(null);
  };

  const handleDelete = (itemId, columnId) => {
    const column = columns[columnId];
    const newItems = column.items.filter(item => item.id !== itemId); // Фильтруем элементы колонки, исключая элемент с указанным ID

    setColumns({
      ...columns,
      [columnId]: { ...column, items: newItems }, // Обновляем только выбранную колонку
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault(); //для избежания нежелательной перезагрузки браузера
    if (!newTaskContent) return; //чтобы не добавить пустую задачу

    const newTask = {
      id: Date.now().toString(), 
      content: newTaskContent,
    };

    setColumns({
      ...columns,
      [selectedColumn]: {
        ...columns[selectedColumn],
        items: [...columns[selectedColumn].items, newTask],
      },
    });

    setNewTaskContent(''); 
  };

  return (
    <div>
      <h1>
        my DnD t0d0 !!1!
      </h1>     
      <form onSubmit={handleAddTask} className="add-task-form">
        <input
          type="text"
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          placeholder="Add new todo.."
        />
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
        >
          <option value="todo">To Do</option>
          <option value="inProgress">In Progress</option>
          <option value="done">Done</option>
          <option value="blocked">Blocked</option>
        </select>
        <button type="submit">Добавить задачу</button>
      </form>
  
      <div className="dnd-container"> 
        {Object.entries(columns).map(([columnId, column]) => (
          <div
            key={columnId}
            className="column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(columnId)}
          >
            <h2>{column.name}</h2>
            {column.items.map((item) => (
              <div
                key={item.id}
                className="task-item"
                draggable
                onDragStart={() => handleDragStart(item, columnId)}
              >
                <span style={{ flexGrow: 1 }}>{item.content}</span>
                <button
                  onClick={() => handleDelete(item.id, columnId)}
                  className="delete-button"
                >
                  Удалить
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
  
      <Link to="/" className="back-button">todo page</Link> 
    </div>
  );
};

export default DndPage;