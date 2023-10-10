import { React } from "react";
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./DatePicker.css";

DatePicker.propTypes = {
    class: PropTypes.string,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export function DatePicker(props) {

    return (
        <Form.Group className={props.class}>
            <Form.Control type="date" name={props.name} placeholder={props.placeholder} value={props.date} onChange={props.handler} disabled={props.disabled} />
        </Form.Group>
    );

}