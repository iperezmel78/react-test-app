import { React, useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { DataCard } from '../datacard/DataCard';
import { Input } from '../input/Input';
import { Message } from '../message/Message';
import { Select } from '../select/Select';
import { DatePicker } from '../datepicker/DatePicker';
import { Pager } from "../pager/Pager";
import { server } from '../../utils/api-servers';
import { constants, showAlert, MESSAGES, VARIANT } from '../../utils/constants';
import './Principal.css';

export function Principal() {

    const rovers = server.nasa.rovers.map(o => o.name);
    const queries = server.nasa.query;
    const maxResults = env.MAX_RESULTS;

    const [isAjax, setIsAjax] = useState(false);
    const [isSol, setIsSol] = useState(true);
    const [data, setData] = useState([]);
    const [rover, setRover] = useState(rovers[0]);
    const [responseVariant, setResponseVariant] = useState(VARIANT.danger);
    const [responseMessage, setResponseMessage] = useState('');
    const [query, setQuery] = useState(queries[0].key);
    const [sol, setSol] = useState(env.SOL);
    const [xol, setXol] = useState(sol);
    const [earthDate, setEarthDate] = useState(new Date().toISOString().slice(0, 10));
    const [page, setPage] = useState(1);
    const [limitReached, setLimitReached] = useState(true);
    const [isError, setIsError] = useState(false);

    const getCameras = (value) => {
        return server.nasa.rovers.find(o => o.name === value).cameras;
    }

    const timerRef = useRef(null);
    let cameras = getCameras(rover);
    const [camera, setCamera] = useState(cameras[0]);
    const NASA_API_URL = `${server.nasa.hostname}/mars-photos/api/${env.NASA_API_VERSION}`;
    const NASA_API_FILTER = `/rovers/${rover}/photos?${server.nasa.query.find(o => o.key === query).key}=${isSol ? sol : earthDate}&page=${page}&camera=${camera}&api_key=${env.NASA_API_KEY}`;

    const callApi = () => {
        setIsAjax(true);
        const apiUrl = `https://${NASA_API_URL}${NASA_API_FILTER}`;
        const metadata = {
            method: 'GET'
        };
        fetch(apiUrl, metadata)
            .then(res => {
                setIsAjax(false);
                if (res.ok) {
                    return res.json();
                }
                throw new Error(JSON.stringify({ status: res.status }));
            })
            .then(res => {
                setData(res.photos);
                if (res.photos.length === 0) {
                    setResponseVariant(VARIANT.sucess);
                    showAlert(MESSAGES.no_data, (value) => setResponseMessage(value));
                }
                setLimitReached(res.photos.length < maxResults);
            })
            .catch(e => {
                setIsError(true);
                const isJSON = constants.regexp.isJson.test(e);
                let message = "";
                if (isJSON) {
                    const json = JSON.parse(e.message);
                    switch (json.status) {
                        case 429:
                            message = "Too many requests";
                            break;
                        case 500:
                            message = "Internal server error";
                            break;
                        default:
                            message = "Server connection error";
                    }
                } else {
                    message = e.message;
                }
                setResponseVariant(VARIANT.danger);
                showAlert(message, (value) => setResponseMessage(value));
            });
    }

    useEffect(() => {
        callApi();
    }, [rover, camera, query, sol, earthDate, page]);

    const handleRover = (e) => {
        setPage(1);
        cameras = getCameras(e);
        setCamera(cameras[0]);
        setRover(e);
    }

    const handleCamera = (e) => {
        setPage(1);
        setCamera(e);
    }

    const handleDate = (e) => {
        setPage(1);
        setEarthDate(e.target.value);
    }

    const handleSol = (e) => {
        const value = e.target.value;
        setXol(value);
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            setPage(1);
            setSol(value);
        }, env.TIMEOUT);
    }

    const handleQuery = (e) => {
        setPage(1);
        setQuery(e);
        setIsSol(e === queries[0].key);
    }

    const handlePrevious = (e) => {
        setPage(page - 1);
    }

    const handleNext = (e) => {
        setPage(page + 1);
    }

    return (
        <div className="Principal">
            <Navbar bg="primary" variant="dark" fixed="top">
                <Container className="NavContainer">
                    <Navbar.Brand>Nasa Land Rover Application</Navbar.Brand>
                    <Nav>
                        <Select class="me-1" title="Select rover" handler={handleRover} disabled={isAjax} items={rovers} />
                        <Select class="me-1" title="Select camera" handler={handleCamera} disabled={isAjax} items={cameras} />
                        <Select class="me-1" title="Query type" handler={handleQuery} disabled={isAjax} items={queries} />
                        <Input class="me-1 small" id="sol" placeholder="Martian rotation" label="Martian rotation" value={xol} handler={handleSol} disabled={isAjax || !isSol} />
                        <DatePicker class="small" name="ed" placeholder="Earth date" date={earthDate} handler={handleDate} disabled={isAjax || isSol} />
                    </Nav>
                </Container>
            </Navbar>
            <Message class="Message" show={responseMessage !== ''} variant={responseVariant} message={responseMessage} />
            <Container className={isError ? 'd-none' : 'BodyContainer'}>
                <Pager show={page === 1 && limitReached} class="ButtonGroupTop" handlePrevious={handlePrevious} handleNext={handleNext} disablePrevious={isAjax || page === 1} disableNext={isAjax || limitReached} />
                <DataCard class={page === 1 && limitReached ? 'CardContainerTop' : 'CardContainer'} data={data}></DataCard>
                <Pager show={page === 1 && limitReached} class="ButtonGroupBottom" handlePrevious={handlePrevious} handleNext={handleNext} disablePrevious={isAjax || page === 1} disableNext={isAjax || limitReached} />
            </Container>
        </div>
    );
}