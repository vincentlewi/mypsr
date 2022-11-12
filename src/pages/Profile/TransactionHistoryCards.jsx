import { Row, Col, Container } from 'react-bootstrap';

export default function TransactionHistoryCards(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    console.log(props.transactionDate)

    if (props.name == "Washer" || props.name == "Dryer") {
        const date_arr = props.date.split(" ")
        console.log(date_arr)
        return (
            <Row className="history text-center py-3 px-3 rounded">
                <Col lg={6} md={6} sm={6} className="text-start">
                    <h2>{props.name}</h2>
                    <span className="text-secondary date">{date_arr[1]} {date_arr[2]} {date_arr[3]} </span>
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