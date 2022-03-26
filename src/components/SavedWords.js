
const SavedWords = (props) => {

    const { savedWords } = props;
    const arrayToString = () => {
        return savedWords.join(', ');
    }
    return(
            arrayToString()
    );
}

export default SavedWords;