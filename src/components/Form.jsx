function Form(){
    return(
        <form>
            <h2 className="label-wrapper">
                <label htmlFor="new-input" className="options-lable">Add Options

                </label>
            </h2>
            <input type="text"
            id="new-input"
            className="input-options"
            name="text"
            autoComplete="off"
             />
             <button type="submit" className="add-btn">Add</button>
        </form>
    )
}
export default Form;