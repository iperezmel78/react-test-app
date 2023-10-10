import { React } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { capitalize, isString } from '../../utils/constants';
import PropTypes from 'prop-types';

Select.propTypes = {
    class: PropTypes.string,
    title: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    items: PropTypes.array.isRequired
};

export function Select(props) {

    return (
        <DropdownButton className={props.class} title={props.title} onSelect={props.handler} disabled={props.disabled}>
            {props.items.map((value) => (
                <Dropdown.Item eventKey={isString(value) ? value : value.key} key={isString(value) ? value : value.key}>{isString(value) ? capitalize(value) : value.text}</Dropdown.Item>
            ))}
        </DropdownButton>
    );
}