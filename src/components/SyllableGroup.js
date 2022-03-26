import RhymeItem from "./RhymeItem";

const SyllableGroup = (props) => {

    const {syllables} = props;
    const {outputList} = props;
    const {savedWords} = props;
    const {setSavedWords} = props;

    return (
        <div>
            <h3>Syllables: {syllables}</h3>
            {outputList.map((item) =>
                <RhymeItem
                    rhyme={item.word}
                    key={item.word}
                    savedWords = {savedWords}
                    setSavedWords={setSavedWords}
                />
            )}
        </div>
    )
}

export default SyllableGroup;