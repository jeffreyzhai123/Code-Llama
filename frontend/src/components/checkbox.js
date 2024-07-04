import Form from 'react-bootstrap/Form';

function CheckBox({checked, onCheckboxChange}) {

  const handleChange = (e) => {
    //updates state "checked" to e.target.checked (which is the status of the checkbox)
    onCheckboxChange(e.target.checked);
  }

  return (
    <Form>
      {['Checkbox'].map((type) => (
        <div key={`default-${type}`} className="mb-3">
          <Form.Check // prettier-ignore
            type={type}
            id={`default-${type}`}
            label={`Agree`}
            //sets checked to default value and updates it when onChange is called 
            checked={checked}
            onChange={handleChange}
          />
        </div>
      ))}
    </Form>
  );
}

export default CheckBox;