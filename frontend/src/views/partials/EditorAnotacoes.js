import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../css/Anotacoes.css';

function EditorAnotacoes({ initialContent, onSave }) {
    const [content, setContent] = useState(initialContent);

    const handleChange = (newContent) => {
        setContent(newContent);
    };

    const handleSave = () => {
        onSave(content);
    };

    return (
        <div >
            <div>
                <ReactQuill value={content} onChange={handleChange} className="editor " />
            </div>
            <button onClick={handleSave} className="save-button">Salvar</button>
        </div>
    );
}

export default EditorAnotacoes;