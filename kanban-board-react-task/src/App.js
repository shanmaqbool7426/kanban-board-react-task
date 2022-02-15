import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    // setColumns({
    //   ...columns,
    //   [source.droppableId]: {
    //     ...sourceColumn,
    //     items: sourceItems,
    //   },
    //   [destination.droppableId]: {
    //     ...destColumn,
    //     items: destItems,
    //   },
    // });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    // setColumns({
    //   ...columns,
    //   [source.droppableId]: {
    //     ...column,
    //     items: copiedItems,
    //   },
    // });
  }
};
// localStorage["datas"] = JSON.stringify([]);
const getColumnn=()=>JSON.parse(localStorage.getItem("datas"))

function App() {
  const [name, setname] = useState("");
  const [des, setdes] = useState("");
  const [title, settitle] = useState("");
  const [columnsFromBackend, setcolumnsFromBackend] = useState(getColumnn)
  const [saveindex, setsaveindex] = useState(false);
  const [toggle, settoggle] = useState(true);
  const [items, setitems] = useState([]);

  let itemobj = { id: uuidv4(), content: "des", title: "title" };

  let obj = { name: name, items: items };
  let columnsmany = {};
  columnsFromBackend.forEach((column) => {
    columnsmany = {
      ...columnsmany,
      ...{ [uuidv4()]: { ...column } },
    };
  });

  const [columns, setColumns] = useState(columnsmany);
  const handleSubmit = (e) => {
    e.preventDefault();
    setitems([])
    let addCol = [...columnsFromBackend, obj];
    setcolumnsFromBackend(addCol);
    setColumns(addCol);
    localStorage.setItem("addcol",JSON.stringify(addCol))
    addCol.map((col,index)=>{
      localStorage.setItem(`${index}`,col)
    })
  };

  const deleteColHnadler = (index) => {
    const columnsFromBackendcpy = [...columnsFromBackend];
    columnsFromBackendcpy.splice(index, 1);
    localStorage["datas"] = JSON.stringify(columnsFromBackendcpy);
    
    setColumns(columnsFromBackendcpy);
    setcolumnsFromBackend(columnsFromBackendcpy);
  };
  const editColHnadler = (index) => {
    setsaveindex(index);
  };
  const edithandleSubmit = (e) => {
    e.preventDefault();
    // columnsFromBackend[index].name = name;
    settoggle(!toggle);
    columnsFromBackend[saveindex].name = name;
  };
  const test = (index,column) => {
    let newarr=columnsFromBackend[index].items
    newarr.push(itemobj);
    columnsFromBackend[index].items=newarr
    localStorage["datas"] = JSON.stringify(columnsFromBackend);
    settoggle(!toggle);
  };
  useEffect(() => {
    setColumns(columns);
  }, [toggle, items]);
const cat = localStorage.getItem('columns');
console.log("cat",cat)
useEffect(() => {
    localStorage.setItem("datas",JSON.stringify(columnsFromBackend))
}, [columnsFromBackend])

  return (
    <>
      <button onClick={test}>clicktask</button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add column
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        {console.log("des", des)}
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add New Task Column
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={handleSubmit}>
                <label for="exampleFormControlInput1" class="form-label">
                  Name
                </label>
                <input
                  value={name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter a name"
                  onChange={(e) => setname(e.target.value)}
                />
                <button
                  type="button"
                  class="btn btn-secondary m-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary m-2 "
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
                {console.log("name", name)}
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* edit model */}
      <div
        class="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={edithandleSubmit}>
                <label for="exampleFormControlInput1" class="form-label">
                  Name
                </label>
                <input
                  value={name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter a name"
                  onChange={(e) => setname(e.target.value)}
                />
                <button
                  type="button"
                  class="btn btn-secondary m-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary m-2 "
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
                {console.log("name", name)}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* add a task */}

      <div
        class="modal fade"
        id="addtask"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={edithandleSubmit}>
                <label for="exampleFormControlInput1" class="form-label">
                  title
                </label>
                <input
                  // value={name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter a name"
                  onChange={(e) => settitle(e.target.value)}
                />
                <label for="exampleFormControlInput1" class="form-label">
                  description
                </label>
                <input
                  // value={name}
                  type="text"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter a name"
                  onChange={(e) => setdes(e.target.value)}
                />
                <button
                  type="button"
                  class="btn btn-secondary m-2"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  class="btn btn-primary m-2 "
                  data-bs-dismiss="modal"
                >
                  Save changes
                </button>
                {console.log("name", name)}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* end a task */}

      {console.log("<<< columnsmany", columnsmany)}
      <div
        style={{ display: "flex", justifyContent: "center", height: "100%" }}
      >
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                key={columnId}
              >
                {console.log("asdf columns", columns)}

                <h2>{column.name}</h2>
                <div style={{ margin: 8 }}>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            background: snapshot.isDraggingOver
                              ? "lightblue"
                              : "lightgrey",
                            padding: 4,
                            width: 250,
                            minHeight: 500,
                          }}
                        >
                          <button
                            className="bg-warning"
                            onClick={() => deleteColHnadler(index)}
                          >
                            DELETE
                          </button>
                          <button
                            onClick={() => editColHnadler(index)}
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop1"
                          >
                            EDIT COL
                          </button>
                          <button
                            onClick={() => test(index,column)}
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            
                          >
                            ADD TASK
                          </button>

                          {column.items.map((item, index) => {
                            return (
                              <>
                                {console.log(">>>> items", items)}
                                <Draggable
                                  key={item.id}
                                  draggableId={item.id}
                                  index={index}
                                >
                                  {(provided, snapshot) => {
                                    return (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                          userSelect: "none",
                                          padding: 16,
                                          margin: "0 0 8px 0",
                                          minHeight: "50px",
                                          backgroundColor: snapshot.isDragging
                                            ? "#263B4A"
                                            : "#456C86",
                                          color: "white",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    );
                                  }}
                                </Draggable>
                                {/* <button
                                  type="button"
                                  class="btn btn-primary"
                                  data-bs-toggle="modal"
                                  data-bs-target="#addtask"
                                >
                                  add task
                                </button> */}
                              </>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      </div>
    </>
  );
}

export default App;
