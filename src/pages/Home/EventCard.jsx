export default function EventCard(props){

    return(
        <div className="events-card col-lg-3 col-md-6 col-sm-12">
            <h5>{props.name}</h5>
            <p>{props.day + ", " + props.time}</p>
            <p>{props.location}</p>
        </div>
    )
}