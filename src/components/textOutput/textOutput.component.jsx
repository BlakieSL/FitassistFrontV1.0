import React from 'react';

const TextOutput = ({ iconClass, id, value }) => (
    <div>
        <i className={iconClass}></i>
        <span id={id} className="form-control-plaintext">
            {value}
        </span>
    </div>
);

export default TextOutput;
