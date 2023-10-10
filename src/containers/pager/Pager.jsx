import { React } from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import PropTypes from 'prop-types';
import "./Pager.css";

Pager.propTypes = {
    show: PropTypes.bool.isRequired,
    class: PropTypes.string,
    handlePrevious: PropTypes.func.isRequired,
    handleNext: PropTypes.func.isRequired,
    disablePrevious: PropTypes.bool.isRequired,
    disableNext: PropTypes.bool.isRequired
};

export function Pager(props) {

    return (
        <Container className={props.show ? 'd-none' : props.class}>
            <ButtonGroup>
                <Button className="Button" variant="primary" onClick={props.handlePrevious} disabled={props.disablePrevious}>&lt;&lt; Previous</Button>
                <Button className="Button" variant="primary" onClick={props.handleNext} disabled={props.disableNext}>Next &gt;&gt;</Button>
            </ButtonGroup>
        </Container>
    );
}