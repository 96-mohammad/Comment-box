import {Comment} from "./components"
import {useState} from "react";
import { v4 as uuid } from 'uuid';

const createComment = commentInfo => {
    return {
        id: uuid(),
        title: commentInfo.title || '',
        description: commentInfo.description || '',
        childComments: [],
        parentId: commentInfo.id || null
    }
}

const initialComment = [
    {
        id: uuid(),
        title: 'Mohammad',
        description: 'hello world!',
        childComments: [],
        parentId: null
    }
];

const App = () => {
    const [comments, setComments] = useState(initialComment);

    const addComment = comment => {
        let newComment = createComment(comment);

        if (!newComment.parentId) {
            setComments([...comments, newComment]);
            return;
        }

        let newCommentList = [...comments];

        newCommentList = newCommentList.map(mainComment => {
            if (mainComment.id === newComment.parentId)
                mainComment.childComments.push(newComment);
            return mainComment;
        })

        setComments([...newCommentList, newComment]);
    }

    const deleteComment = comment => {
        let newCommentList = [...comments];

        newCommentList = newCommentList.map(mainComment => {
            if (mainComment.id === comment.parentId) {
                let index = mainComment.childComments.findIndex(childern => childern.id === comment.id);
                mainComment.childComments.splice(index, 1)
            }
            return mainComment;
        })

        newCommentList = newCommentList.filter(mainComment => mainComment.id !== comment.id && mainComment.parentId !== comment.id);

        setComments(newCommentList);
    }


    const renderMainComment = () => {
        return comments.filter(comments => comments.parentId === null)
    }

    return (
        <div className="container">
            {renderMainComment().map(comment => (
                <Comment
                    deleteComment={deleteComment}
                    mainComment={true}
                    addComment={addComment}
                    comment={comment}
                    key={comment.id}/>
            ))}
        </div>
    );
}

export default App;
