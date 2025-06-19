const DeletePopUp = (props) => {

    const style = {
        display: props.visible ? 'block' : 'none'
    }


    return(
        <div  className="popup-overlay">
            <div className="popup">
                <h2>Are you sure?</h2>
                <p>You're about to delete this post.</p>
                <p>This step cannot be undone.</p>
                <div className="popup-buttons">
                    <button onClick={props.onClick} value='confirm' className="confirm-delete">Confirm</button>
                    <button onClick={props.onClick} value='cancel' className="cancel-delete">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DeletePopUp