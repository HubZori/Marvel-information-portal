import { Component } from 'react';
import PropTypes from 'prop-types';
import { MarvelService } from '../services/MarvelService'
import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import Spinner from '../spinner/Spinner';





class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1520,
        charEnded: false,
    }



    marvelService = new MarvelService();


    componentDidMount() {
        this.onRequest();
    }


    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError)
    }
   

    onCharListLoading = () =>{
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;            
        }
        this.setState(({offset,charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading:false,
            offset: offset + 9,
            charEnded: ended
        }))
    }


    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }



    renderItem(arr) {
        const items = arr.map(item => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle= {'objectFit': 'unset'};
            }
            return (
                <li className='char__item'
                    id={item.id}
                    onClick={() => this.props.onSelectedChar(item.id)} >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        }) 
        return (
            
            <ul className="char__grid">
                {items}
            </ul>
        ) 

    }

    render() {

        const state = this.state
        /* console.log(state) */

        const item = this.renderItem(state.charList)
        const spinner = state.loading ? <Spinner /> : null;
        return (
            <div className="char__list">
                    {spinner}
                    {item}
                    {/* <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li> */}
                <button
                 className="button button__main button__long"
                 disabled={state.newItemLoading}
                 style={{'display': state.charEnded ? 'none' : 'block'}}
                 onClick={()=> this.onRequest(state.offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }


}

CharList.propTypes = {
    onSelectedChar: PropTypes.func
}

export default CharList;