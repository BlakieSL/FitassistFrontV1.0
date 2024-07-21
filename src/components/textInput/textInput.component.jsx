const TextInput = ({ iconClass, type = "text", id, name, placeholder, required = true, value, onChange }) => (
    <div className="form-group">
        <i className={iconClass}></i>
        <input
            type={type}
            id={id}
            name={name}
            className="form-control"
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={onChange}
        />
    </div>
);

export default TextInput;
