const SelectInput = ({ iconClass, id, name, options, required = true, placeholder, value, onChange }) => (
    <div className="form-group">
        <i className={iconClass}></i>
        <select
            id={id}
            name={name}
            className="form-control"
            required={required}
            value={value}
            onChange={onChange}
        >
            <option value="" disabled>{placeholder}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

export default SelectInput;
