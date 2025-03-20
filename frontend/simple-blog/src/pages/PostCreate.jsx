export default function CreatePost(){
    return(
        <div className="create">
            <form action="">

                <input id="title" name="title" type="text" placeholder="Title" />

                <textarea id="content" name="content" rows={14} placeholder="Content"></textarea>

                <div className="button-container">
                    <button id="save">Save as Draft</button>
                    <button id="post">Submit</button>
                </div>
            </form>
        </div>
    )
}