import { Component } from 'react';
import Skeleton from '../skeleton/Skeleton'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../404/ErrorMessage';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';
import PropTypes from 'prop-types';
import { MarvelService } from '../services/MarvelService';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }



    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }


    componentDidUpdate(prevProps){
        if (this.props.charId !== prevProps.charId ) {
            this.updateChar();
        }
    }



    updateChar = () => {
        const { charId } = this.props;
        if (!charId) {
            return
        }


        this.onCharLoading();

        this.marvelService
            .getCharacter(charId)
            .then(this.onChareLoaded)
            .catch(this.onError);

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

    render() {

        const { char, loading, error } = this.state;

        const skeleton = char || error || loading ?  null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char} /> : null


        return (

            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name , description , thumbnail, homepage, wiki, comics} = char;
    const comicsArray = comics.length === 0 ? [{"name":"no Comics"}] : comics
    let imgStyle = {'objectFit': 'cover'};
            if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle= {'objectFit': 'unset'};
            }
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={imgStyle} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsArray.slice(0,10).map((item, i) => {
                    return(
                <li key={i} className="char__comics-item">
                    {item.name}                    
                </li>
                    )
                })}
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;