import { useState } from "react";

export default function List({ items = [] }) {
  const initDnD = { // Drag and Drop
    draggedFrom: null,
    draggedCurrent: null,
    draggedTo: null,
    isDragging: false,
  }
  const [DnD, setDnD] = useState(initDnD)

  const onDragStart = (index) => {
    setDnD({
      draggedFrom: { index },
      draggedCurrent: { index },
      draggedTo: null,
      isDragging: true,
    });
  }

  const onDragOver = (event) => {
    const idx = Number(event.target.dataset.index);
    const parentIdx = Number(event.target.parentElement.dataset.index);
    if (DnD.isDragging) {
      setDnD({ ...DnD, draggedTo: idx, draggedCurrent: parentIdx });
    }
  }

  const onDragEnd = () => {
    setDnD({
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    })
  }

  const list = [];
  items.forEach((vals, idx) => {
    list.push(<ListItem id={idx} title={vals.company} desc={vals.position} index={idx} onDragStart={onDragStart} onDragEnd={onDragEnd} dragTo={DnD.draggedTo} dragCurrent={DnD.draggedCurrent} onDragOver={onDragOver} />);
  });
  return (
    <div className={`flex justify-center flex-col gap-1 ${DnD.isDragging ? "text-gray-300" : ""}`}>
      {list}
    </div >
  );
}

function ListItem({ title, desc, id, onClick, index, dragTo, dragCurrent, onDragOver, onDragStart, onDragEnd }) {
  let styles = "";
  if (index === dragTo && index === dragCurrent) {
    styles = "border-t-8 border-t-blue-300";
  }
  else if (index + 1 === dragTo && dragCurrent !== dragTo) {
    styles = "border-b-8 border-b-blue-300";
  }
  else {
    styles = "";
  }

  return (
    <button type="button" className={`w-full text-start bg-gray-50 hover:bg-gray-100 rounded-sm p-1 ${styles}`} onClick={() => onClick(id)} draggable="true" onDragStart={() => onDragStart(index)} onDragEnd={onDragEnd} data-index={index}>
      <div className="font-bold" data-index={index} onDragOver={onDragOver}>{title}</div>
      <div className="text-sm text-gray-700" data-index={index + 1} onDragOver={onDragOver}>{desc}</div>
    </button>
  )
}
