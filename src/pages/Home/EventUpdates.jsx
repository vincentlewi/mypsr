import EventCard from "./EventCard";

export default function EventUpdates(){
    let events = [
        {
            id: 1,
            name: "Basketball",
            day: "October 13",
            time: "7-8pm",
            location: "PSR Basketball Court"
        },
        {
            id: 2,
            name: "Dinner",
            day: "October 17",
            time: "8pm",
            location: "PSR Dining Hall"
        },
        {
            id: 3,
            name: "Rokok?",
            day: "Anyday",
            time: "11pm",
            location: "Diluar PSR"
        },
        {
            id: 4,
            name: "Dulin",
            day: "October 14",
            time: "12am",
            location: "Khakabo"
        }
    ]

    return(
        <div className="schedule p-3 mx-auto">
            <h2>Recent Updates for you:</h2>
            <div className="activity-section row px-2 d-flex flex-wrap">
                {events.map((event) => {
                    return (
                    <EventCard name={event.name} time= {event.time} day={event.day} location={event.location}/>
                    )
                })}
            </div>
        </div>
    );
}