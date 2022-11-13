import { Row, Col } from 'react-bootstrap';
import { format } from 'date-fns'

export default function TransactionHistoryCards(props) {
    if (props.name === "Washer" || props.name === "Dryer") {
        return (
            <Row className="history text-center py-3 px-3 rounded">
                <Col lg={6} md={6} sm={6} className="text-start">
                    <h2>{props.name}</h2>
                    <span className="text-secondary date">{format(new Date(props.date), 'dd MMM yyyy')} </span>
                </Col>
                <Col lg={6} md={6} sm={6} className="m-auto text-end">
                    <h5>- {props.price}.00</h5>
                    <span className='text-bottom'>{props.status}</span>
                </Col>
            </Row>
        )
    } else {
        return (
            <Row className="topup text-center py-3 px-3 rounded">
                <Col lg={6} md={6} sm={6} className="text-start">
                    <h2>Top Up</h2>
                    <span className="text-secondary date">{props.date}</span>
                </Col>
                <Col lg={6} md={6} sm={6} className="m-auto text-end">
                    <h5>+ {props.price}.00</h5>
                    <span>{props.status}</span>
                </Col>
            </Row>

        )
    }
}