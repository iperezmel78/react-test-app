import { React } from "react";
import { Alert } from "react-bootstrap";
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import "./Message.css";

Message.propTypes = {
    show: PropTypes.bool.isRequired,
    class: PropTypes.string,
    variant: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export function Message(props) {

    return (
        <CSSTransition
            in={props.show}
            timeout={300}
            classNames="alert"
            unmountOnExit
        >
            <Alert className={props.class} variant={props.variant}>{props.message}</Alert>
        </CSSTransition>
    );

}