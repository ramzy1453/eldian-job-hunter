const FormRow = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.label} className="form-label">
        {props.label === "jobLocation" ? "Job Location" : props.label}
      </label>
      <input
        type={props.type}
        value={props.value}
        name={props.label}
        onChange={props.onChange}
        className="form-input"
      />
      {props.errors && (
        <div
          style={{
            color: "#842029",
            margin: "0.25em 0",
          }}
        >
          {props.errors}
        </div>
      )}
    </div>
  );
};

export default FormRow;

export const ReactSelect = (props) => {
  return (
    <div className="form-row">
      <label htmlFor={props.label} className="form-label">
        {props.label}
      </label>
      <select
        name={props.label}
        value={props.value}
        onChange={props.onChange}
        className="form-select"
      >
        {props.enum.map(([id, label]) => (
          <option key={id} value={id}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
};
