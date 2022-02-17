import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Reorder, getItemStyle, getQuestionListStyle } from "./utils";
import Listing from "./listing";
import Navbar from "./navbar";
import { v4 as uuidv4 } from "uuid";

      
      const getColumnn = () => JSON.parse(localStorage.getItem("datas")) ?JSON.parse(localStorage.getItem("datas")):localStorage.setItem("datas", JSON.stringify([]));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      column: getColumnn(),
      name: "shan",
      title: "shan",
      des: "",
      saveindex: false,
      toggle: false,
      answers: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);

    let columnsmany = {};
    this.state.column.forEach((column) => {
      columnsmany = {
        ...columnsmany,
        ...{ [uuidv4()]: { ...column } },
      };
    });
    this.setState({ column: columnsmany });
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.type === "QUESTIONS") {
      const column = Reorder(
        this.state.column,
        result.source.index,
        result.destination.index
      );

      this.setState({
        column,
      });
    } else {
      const answers = Reorder(
        this.state.column[parseInt(result.type, 10)].answers,
        result.source.index,
        result.destination.index
      );

      const column = JSON.parse(JSON.stringify(this.state.column));

      column[result.type].answers = answers;

      this.setState({
        column,
      });
    }
  }

  render() {
    let obj = {
      id: uuidv4(),
      name: this.state.name,
      answers: this.state.answers,
    };

    let itemobj = {
      id: uuidv4(),
      content: this.state.des,
      title: this.state.title,
    };

    const saveindexHandler = (index) => {
      this.setState({ saveindex: index });
    };

    const edithandleSubmit = (e) => {
      e.preventDefault();
      this.state.column[this.state.saveindex].name = this.state.name;
      localStorage.setItem("datas", JSON.stringify(this.state.column));

      this.setState({ toggle: !this.state.toggle });
    };

    const listSubmit = (e) => {
      e.preventDefault();
      let arr = this.state.column[this.state.saveindex].answers;
      arr.push(itemobj);
      this.state.column[this.state.saveindex].answers = arr;
      localStorage.setItem("datas", JSON.stringify(this.state.column));

      this.setState({ toggle: !this.state.toggle });
    };

    const addcolumn = (e) => {
      e.preventDefault();
      let addCol = [...this.state.column, obj];
      localStorage.setItem("datas", JSON.stringify(addCol));
      this.setState({ column: addCol });
    };

    const deletehandler = (index) => {
      const cpyquestions = [...this.state.column];
      cpyquestions.splice(index, 1);
      localStorage["datas"] = JSON.stringify(cpyquestions);

      this.setState({ column: cpyquestions });
    };


    return (
      <>
        <Navbar />
        <DragDropContext
          onDragEnd={this.onDragEnd}
          onDragUpdate={this.onDragUpdate}
        >
          <Droppable droppableId="droppable" type="QUESTIONS">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getQuestionListStyle(snapshot.isDraggingOver)}
              >
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Colum</h5>
                      </div>
                      <div class="modal-body">
                        <form onSubmit={addcolumn}>
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Name
                          </label>
                          <input
                            // value={this.setState.name}
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter a name"
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                {/*edit  Modal */}
                <div
                  class="modal fade"
                  id="staticBackdrop2"
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
                          Edit Title
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
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Name
                          </label>
                          <input
                            // value={name}
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter a name"
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* end edit modal */}

                {/* list inner */}

                <div
                  class="modal fade"
                  id="staticBackdrop3"
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
                          Task Add
                        </h5>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body">
                        <form onSubmit={listSubmit}>
                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Name
                          </label>
                          <input
                            // value={name}
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter a name"
                            onChange={(e) =>
                              this.setState({ name: e.target.value })
                            }
                          />

                          <label
                            for="exampleFormControlInput1"
                            class="form-label"
                          >
                            Description
                          </label>
                          <input
                            // value={name}
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter a name"
                            onChange={(e) =>
                              this.setState({ des: e.target.value })
                            }
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
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {/* enf list */}

                {Object.entries(this.state.column).map(
                  ([columnId, col], index) => (
                    <Draggable key={index} draggableId={columnId} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <div className="d-flex justify-content-evenly">
                            {" "}
                            <span {...provided.dragHandleProps}>
                              <i class="fal fa-grip-horizontal"></i>
                              <b>{col.name}</b>
                            </span>
                            <span onClick={deletehandler.bind(this, index)}>
                              <i class="fas fa-trash-alt"></i>
                            </span>
                            <span
                              onClick={() => saveindexHandler(index)}
                              type="button"
                              class="btn btn-primary"
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdrop2"
                            >
                              <i class="fas fa-edit"></i>
                            </span>
                          </div>
                          {col && (
                            <Listing questionNum={index} question={col} />
                          )}
                          <button
                            onClick={() => saveindexHandler(index)}
                            type="button"
                            class="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop3"
                          >
                            Add Task
                          </button>
                        </div>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </>
    );
  }
}

export default App;
