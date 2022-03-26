import './App.css';
import {useState} from "react";
import InputGroup from "./components/InputGroup";
import SavedWords from "./components/SavedWords";
import SyllableGroup from "./components/SyllableGroup";

function App() {

    const [outputList, setOutputList] = useState([])
    const [wordValue, setWordValue] = useState('')
    const [savedWords, setSavedWords] = useState([])
    const [rhymeOrSyn, setRhymeOrSyn] = useState('')

  return (
      <main className="container">
        <h1 className="row">Rhyme Finder (579 Problem Set 5)</h1>
        <div className="row">
            Saved Words: <SavedWords
                savedWords={savedWords}
            />
        </div>
          <div className="row">
              <InputGroup
                  setOutputList={setOutputList}
                  wordValue={wordValue}
                  setWordValue={setWordValue}
                  setRhymeOrSyn={setRhymeOrSyn}
              />
          </div>
          <div>
              <h2>{rhymeOrSyn ? (rhymeOrSyn==='rhyme' ? 'Words that rhymes with ' : ' Words that have a similar meaning to ') + wordValue: ''}</h2>
          </div>
        <div className="output row">
            {Object.keys(outputList).map((item) =>
                <SyllableGroup
                    syllables={item}
                    key={item}
                    outputList={outputList[item]}
                    savedWords={savedWords}
                    setSavedWords={setSavedWords}
                />
            )}
        </div>
      </main>
  );
}

export default App;
