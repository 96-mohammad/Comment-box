import {useState} from "react";
import {AddComment} from "./index";

const Comment = props => {
    const {
        comment,
        addComment,
        mainComment,
        deleteComment
    } = props;

    let { id, title, description, childComments } = comment;

    const [isShowAddComment, setIsShowAddComment] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [updatedDescription, setUpdatedDescription] = useState(comment.description);

    const changeAddCommentShowState = state => {
        setIsShowAddComment(state);
    }

    const changeEditedState = () => {
        setIsEdited(!isEdited)
    }

    const handleDescriptionChange = ({target}) => {
        setUpdatedDescription(target.value)
    }

    const updateComment = () => {
        changeEditedState();

        comment.description = updatedDescription;
    }

    return (
        <div className={mainComment ? "comment" : "comment margin-left"}>
            <div className={mainComment ? "comment-box different-background" : "comment-box"}>
                <p className="text-bold">{title}</p>
                {isEdited ?
                    <input type="text" value={updatedDescription} onChange={handleDescriptionChange}/> :
                    <p>{description}</p>}
                <div className="btn-box">
                    <button
                        disabled={isEdited}
                        onClick={() => changeAddCommentShowState(true)}>
                        Reply
                    </button>
                    {!mainComment && (
                        <>
                            <button
                                onClick={!isEdited ? changeEditedState : updateComment}>
                                {isEdited ? 'Save' : 'Edit'}
                            </button>
                            <button
                                disabled={isEdited}
                                onClick={() => deleteComment(comment)}>
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
            {childComments.length > 0 &&
                childComments.map(comment => (
                <Comment
                    deleteComment={deleteComment}
                    addComment={addComment}
                    comment={comment}
                    key={id}/>
            ))}
            {isShowAddComment &&
                <AddComment
                    commentId={comment.id}
                    changeAddCommentShowState={changeAddCommentShowState}
                    addComment={addComment}/>}
        </div>
    );
}

export default Comment;