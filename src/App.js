import './App.css';
import {useState} from "react";
import InputGroup from "./components/InputGroup";
import SavedWords from "./components/SavedWords";
import SyllableGroup from "./components/SyllableGroup";

function App() {

    const [outputList, setOutputList] = useState([])
    const [wordValue, setWordValue] = useState('')
    const [inputValue, setInputValue] = useState('')
    const [savedWords, setSavedWords] = useState([])
    const [rhymeOrSyn, setRhymeOrSyn] = useState('')
    const [resultStatus, setResultStatus] = useState('')

  return (
      <main className="container">
        <h1 className="row">Rhyme Finder (579 Problem Set 6)</h1>
        <div className="row">
            Saved Words: <SavedWords
                savedWords={savedWords}
            />
        </div>
          <div className="row">
              <InputGroup
                  setOutputList={setOutputList}
                  setWordValue={setWordValue}
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                  setRhymeOrSyn={setRhymeOrSyn}
                  setResultStatus={setResultStatus}
              />
          </div>
          <div>
              <h2>{rhymeOrSyn ? (rhymeOrSyn==='rhyme' ? 'Words that rhymes with ' : 'Words with a similar meaning to ') + wordValue: ''}</h2>
          </div>
          <div>
              <h2>{resultStatus}</h2>
          </div>
        <div className="output row">{outputList.length > 0 ?
            Object.keys(outputList).map((item) =>
                <SyllableGroup
                    rhymeOrSyn={rhymeOrSyn}
                    syllables={item}
                    key={item}
                    outputList={outputList[item]}
                    savedWords={savedWords}
                    setSavedWords={setSavedWords}
                />
            ) : <h3>No Results</h3>}
        </div>
      </main>
  );
}

export default App;
