import {useState} from "react";

const initialValues = {title: '', description: ''}

const AddComment = ({ changeAddCommentShowState, addComment, commentId }) => {
    const [commentValues, setCommentValues] = useState(initialValues);

    const handleChange = ({ target }) => {
        const { name, value } = target;

        setCommentValues({...commentValues, [name]: value})
    }

    const submitForm = e => {
        e.preventDefault();

        if (!commentValues.title || !commentValues.description) return;

        const requestedData = {
            title: commentValues.title,
            description: commentValues.description,
            id: commentId
        };

        addComment(requestedData);
        changeAddCommentShowState(false);
    }
    return (
        <form className="form" onSubmit={submitForm}>
            <input
                name="title"
                type="text"
                placeholder="Your name"
                value={commentValues.title}
                onChange={handleChange}/>
            <textarea
                name="description"
                placeholder="Comment"
                value={commentValues.description}
                onChange={handleChange}/>
            <div className="btn-box">
                <button
                    type="submit">
                    Post
                </button>
                <button
                    onClick={() => changeAddCommentShowState(false)}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default AddComment;