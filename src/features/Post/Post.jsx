import React, {useState} from 'react';
import moment from 'moment';
import Card from '../Card/Card';
import { TiArrowUpOutline, TiArrowUpThick, TiArrowDownOutline, TiArrowDownThick } from 'react-icons/ti';
import './Post.css';
import shortenNumber from '../../utils/shortenNumber';

const Post = (props) => {
    const [score, setScore] = useState(0);
    const post = props.post;

    const onHandleVote = (newScore) => {
        if(newScore === score){
            setScore(0);
        } else if (newScore === 1) {
            setScore(1);
        } else {
            setScore(-1);
        }
    };

    const renderUpvote = () => {
        if (score === 1){
            return <TiArrowUpThick className='icon-action'/>;
        }
        return <TiArrowUpOutline className='icon-action'/>;
    }

    const renderDownvote = () => {
        if (score === -1){
            return <TiArrowDownThick className='icon-action'/>;
        }
        return <TiArrowDownOutline className='icon-action'/>;
    }

    const getVoteType = () => {
        if (score === 1) {
            return 'upvote';
        }
        if (score === -1) {
            return 'downvote';
        }

        return '';
    };

    return (
        <article key={post.id}>
            <Card>
                <div className='post-wrapper'>
                    <div className='post-score-container'>
                        <button
                            type='button'
                            className={`icon-action-button upvote ${score === 1 && 'active'}`}
                            onClick={() => onHandleVote(1)}
                            >
                            {renderUpvote()} 
                            </button>
                        
                        <button
                            type='button'
                            className={`icon-action-button downvote ${score === -1 && 'active'}`}
                            onClick={() => onHandleVote(-1)}
                            >
                            {renderDownvote()} 
                            </button>
                            <p className={`post-score ${getVoteType()}`}>
                                {shortenNumber(post.ups,1)}
                            </p>
                    </div>
                    <div className='post-container'>
                        <h3 className='post-title'>{post.title}</h3>
                        <div className='post-img-container'>
                            <img src={post.url} alt='' className='post-img'/>
                        </div>
                        <div className='post-details'>
                            <span className='author-username'>{post.author}</span>
                            <span>{moment.unix(post.created_utc).fromNow()}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </article>
    );
};

export default Post;