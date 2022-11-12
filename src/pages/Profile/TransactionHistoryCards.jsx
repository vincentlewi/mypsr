import { Row, Col, Container } from 'react-bootstrap';

export default function TransactionHistoryCards(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (props.name == "Washer" || props.name == "Dryer") {
        const date_arr = props.date.split(" ")
        const day = date_arr[0].split("/")[1]
        const month = date_arr[0].split("/")[0]
        const year = date_arr[0].split("/")[2]
        return (
            <Row className="history text-center py-3 px-3 rounded">
                <Col lg={6} md={6} sm={6} className="text-start">
                    <h2>{props.name}</h2>
                    <span className="text-secondary date">{day} {monthNames[month-1].slice(0,3)} {year.slice(0,4)}</span>
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