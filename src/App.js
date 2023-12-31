import './App.css';
import { useState } from "react";

const Modal = ({ close, submit}) => {

  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  return(
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header-group">
          <div className='modal-title'>Add new list</div>
          <div className="close" onClick={close}>&times;</div>
        </div>
        <div className='modal-body'>
          <div className='modal-form-group'>
            <div className='item-label'>To do:</div>
            <input className="item-input" value={message}  onChange={handleChange}></input>
          </div>
          <div className='submit-btn' onClick={event => submit(message)}>Submit</div>
        </div>
      </div>
    </div>
  )
}

const EditModal = ({ close, submit}) => {
  const [message, setMessage] = useState('');
  const handleChange = event => {
    setMessage(event.target.value);
  };

  return(
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header-group">
          <div className='modal-title'>Update list</div>
          <div className="close" onClick={close}>&times;</div>
        </div>
        <div className='modal-body'>
          <div className='modal-form-group'>
            <div className='item-label'>To do:</div>
            <input className="item-input" value={message}  onChange={handleChange}></input>
          </div>
          <div className='submit-btn' onClick={event => submit(message)}>Submit</div>
        </div>
      </div>
    </div>
  )
}

const Item = ({content, index, edit, remove}) => {
  return(
    <div className='item-group'>
      <div className='index-count'>{index + 1}</div>
      <div className='item-desc'>{content}</div>
      <div className='edit option-btn' onClick={event => edit(index)}>Edit</div>
      <div className='delete option-btn' onClick={event => remove(index)}>Delete</div>
    </div>
  )
}

function App() {

  const [list, setList] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedIndex, setselectedIndex]  = useState(0);

  const showModal = () => {
    setIsModal(!isModal);
  }

  const showEditModal = () => {
    setIsEdit(!isEdit);
  }

  const submit = (msg) => {
    list.push(msg);
    setIsModal(false);
  }

  const remove = (index) => {
    setList([
      ...list.slice(0, index),
      ...list.slice(index + 1)
    ]);
  }

  const editHandler = (index) => {
    setselectedIndex(index)
    showEditModal();
  }

  const submitEdit = (msg) => {
    list[selectedIndex] = msg;
    setIsEdit(false);
  }


  return (
    <div className="todo-container">
      <div className="todo-header">Todo List</div>
      <div className="todo-body">
        {list.length === 0 ? <div className='no-data'>No data yet</div> : null}
        {list.length > 0 ? <div className='list-container'>
          {
            list.map((itm, index) => (
            <Item 
              content={itm} 
              index={index} 
              key={index}
              remove={remove}
              edit={editHandler}
            >
            </Item>
          ))}
        </div> : null}
        <div className="btn-group">
          <div className="btn add" onClick={showModal}><span>&#43;</span></div>
        </div>
      </div>
      {isModal ? <Modal close={showModal} submit={submit}></Modal> : null}
      {isEdit ? <EditModal close={showEditModal} submit={submitEdit}></EditModal> : null}
    </div>
  );
}

export default App;
