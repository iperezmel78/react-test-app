import { React } from "react";
import { Form, InputGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import "./Input.css";

Input.propTypes = {
    id: PropTypes.string.isRequired,
    class: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

export function Input(props) {

    return (
        <InputGroup className={props.class}>
            <InputGroup.Text id={props.id}>#</InputGroup.Text>
            <Form.Control
                placeholder={props.placeholder}
                aria-label={props.label}
                value={props.value}
                onChange={props.handler}
                aria-describedby={props.id}
                disabled={props.disabled}
            />
        </InputGroup>
    );

}