import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../404/ErrorMessage';
import {MarvelService} from '../services/MarvelService'
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';




class RandomChar extends Component {
    state = {
        char: {},
        loading: true,
        error: false
    }



    marvelService = new MarvelService();


    componentDidMount() {
        this.updateChar();
       // this.timerId = setInterval(this.updateChar, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }



    onChareLoaded = (char) => {
        this.setState({
            char,
            loading: false
         })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
         })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
         })

    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000) ;
        this.onCharLoading()
        this.marvelService
            .getCharacter(id)
            .then(this.onChareLoaded)
            .catch(this.onError);
            
    }

    render() {

        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char} /> : null
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}


const View = ({char}) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    const image_not_available = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
    return (
        <div className="randomchar__block">
            {
                thumbnail === image_not_available  ? 
                <img  src={image_not_available} style={{ objectFit: 'contain'}} className="randomchar__img" alt="Random character"/>  :
                <img  src={thumbnail} className="randomchar__img" alt="Random character" />}
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description ? description : "!oops no description "}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;