import { useEffect, useState } from "react";
import api from "../services/api";

export function Home() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        api.get("/events")
            .then(response => {
                console.log(response.data);
                setEvents(response.data.events);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>BDE Events</h1>

            {events.map(event => (
                <div key={event.id}>
                    <h2>{event.title}</h2>
                    <p>{event.date}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;