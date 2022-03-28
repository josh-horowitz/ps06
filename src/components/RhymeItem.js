

const RhymeItem = (props) => {

    const {rhyme} = props;
    const {savedWords} = props;
    const {setSavedWords} = props;

    const addSavedWords = () =>{
        if (!savedWords.includes(rhyme)){
            setSavedWords((currentRhymeList) => {
                const updatedRhymeList = [
                    ...currentRhymeList,
                    rhyme
                ]
                return updatedRhymeList
            })
        }
    }
    return(
        <li>
            {rhyme} <button onClick={addSavedWords}>
                Save
            </button>
        </li>
    );
}

export default RhymeItem;