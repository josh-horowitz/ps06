
const InputGroup = (props) => {
    const {setOutputList} = props;
    const {wordValue} = props;
    const {setWordValue} = props;
    const {setRhymeOrSyn} = props;


    /**
     * Makes a request to Datamuse and updates the page with the
     * results.
     *
     * Use the getDatamuseRhymeUrl()/getDatamuseSimilarToUrl() functions to make
     * calling a given endpoint easier:
     * - RHYME: `datamuseRequest(getDatamuseRhymeUrl(), () => { <your callback> })
     * - SIMILAR TO: `datamuseRequest(getDatamuseRhymeUrl(), () => { <your callback> })
     *
     * @param {String} url
     *   The URL being fetched.
     * @param {Function} callback
     *   A function that updates the page.
     */
    function datamuseRequest(url, callback) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                // This invokes the callback that updates the page.
                callback(data);
            }, (err) => {
                console.error(err);
            });
    }
    /**
     * Gets a URL to fetch rhymes from Datamuse
     *
     * @param {string} rel_rhy
     *   The word to be rhymed with.
     *
     * @returns {string}
     *   The Datamuse request URL.
     */
    function getDatamuseRhymeUrl(rel_rhy) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'rel_rhy': rel_rhy})).toString()}`;
    }

    /**
     * Gets a URL to fetch 'similar to' from Datamuse.
     *
     * @param {string} ml
     *   The word to find similar words for.
     *
     * @returns {string}
     *   The Datamuse request URL.
     */
    function getDatamuseSimilarToUrl(ml) {
        return `https://api.datamuse.com/words?${(new URLSearchParams({'ml': ml})).toString()}`;
    }

    function groupBy(objects, property) {
        // If property is not a function, convert it to a function that accepts one argument (an object) and returns that object's
        // value for property (obj[property])
        if(typeof property !== 'function') {
            const propName = property;
            property = (obj) => obj[propName];
        }

        const groupedObjects = new Map(); // Keys: group names, value: list of items in that group
        for(const object of objects) {
            const groupName = property(object);
            //Make sure that the group exists
            if(!groupedObjects.has(groupName)) {
                groupedObjects.set(groupName, []);
            }
            groupedObjects.get(groupName).push(object);
        }

        // Create an object with the results. Sort the keys so that they are in a sensible "order"
        const result = {};
        for(const key of Array.from(groupedObjects.keys()).sort()) {
            result[key] = groupedObjects.get(key);
        }
        return result;
    }

    function getRhymes(){
        if (wordValue){
            setRhyme()
            datamuseRequest(getDatamuseRhymeUrl(wordValue), (results) => {
                if (results.length > 0){
                    setOutputList(() => {
                        return groupBy(results, 'numSyllables');
                    })
                }
            })
        }

    }

    function setRhyme() {
        setRhymeOrSyn(() => {
            return 'rhyme'
        })
    }

    function getSynonyms(){
        if (wordValue){
            setSyn()
            datamuseRequest(getDatamuseSimilarToUrl(wordValue), (results) => {
                if (results.length > 0){
                    setOutputList(() => {
                        return results;
                    })
                }
            })
        }
    }

    function setSyn(){
        setRhymeOrSyn(() => {
            return 'syn'
        })
    }

    const keyDownHandler = (e) => {
        if (e.key === 'Enter') {
            getRhymes()
        }
    }
    return (
        <div className="row">
            <div className="input-group col">
                <input
                    value={wordValue}
                    className="form-control"
                    type="text"
                    placeholder="Enter a word"
                    id="word_input"
                    onChange={(e) => setWordValue(e.target.value)}
                    onKeyDown={keyDownHandler}
                />
                <button
                    id="show_rhymes"
                    type="button"
                    className="btn btn-primary"
                    onClick={getRhymes}>
                    Show rhyming words
                </button>
                <button
                    id="show_synonyms"
                    type="button"
                    className="btn btn-secondary"
                    onClick={getSynonyms}>
                    Show synonyms
                </button>
            </div>
        </div>
    )
}

export default InputGroup;