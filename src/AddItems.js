import { FaPlusCircle } from "react-icons/fa";
import { useRef } from "react";

const AddItems = ({newItems, setNewItems, handleSubmit}) => {

  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handleSubmit}>
      <label htmlFor="addItem">Add Item</label>
      <input 
        required
        ref={inputRef}
        autoFocus
        id="addItem" 
        type="text"
        placeholder="Add Item"
        value={newItems}
        onChange={(e)=> setNewItems(e.target.value)}  //To display the value on the screen
      ></input>
      <button type="submit" aria-label="Add Item" onClick={(e)=>inputRef.current.focus}>
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default AddItems;
