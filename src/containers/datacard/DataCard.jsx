import { React } from "react";
import { Card, Container } from "react-bootstrap";
import PropTypes from 'prop-types';
import "./DataCard.css";

DataCard.propTypes = {
    class: PropTypes.string,
    data: PropTypes.array.isRequired
};

export function DataCard(props) {

    return (
        <Container className={props.class}>
            {props.data.map(data => (
                <Card className="Card" key={data.id}>
                    <Card.Img className="CardImgage" variant="top" src={`${data.img_src.replace('http://', 'https://')}`} />
                    <Card.Body className="CardBody">
                        <Card.Title>Photo Id: {`${data.id}`}</Card.Title>
                        <Card.Text>Rover: {`${data.rover.name}`}<br />Camera: {`${data.camera.name}`}</Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </Container>
    );

}