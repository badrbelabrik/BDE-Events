import { useEffect, useState } from "react";
import api from "../services/api";

export default function StudentSpace() {

    const [events, setEvents] = useState([]);
    const [reservations, setReservations] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {

            const [eventsResponse, reservationsResponse] =
                await Promise.all([
                    api.get("/events"),
                    api.get("/user/reservations")
                ]);

            console.log("Events:", eventsResponse.data);
            console.log("Reservations:", reservationsResponse.data);

            setEvents(eventsResponse.data.events || []);
            setReservations(
                reservationsResponse.data.reservations || []
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to load your student space."
            );

        } finally {
            setLoading(false);
        }
    };


    /*
     * Book an event
     */
    const handleSubscribe = async (eventId) => {

        try {

            const response = await api.post(
                `/events/${eventId}/book`
            );

            console.log("Booking:", response.data);

            /*
             * Reload data after booking
             */
            await fetchData();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to subscribe to this event."
            );
        }
    };


    /*
     * Cancel reservation
     */
    const handleCancel = async (reservationId) => {

        const confirmed = window.confirm(
            "Are you sure you want to cancel this reservation?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/reservations/${reservationId}`
            );

            /*
             * Remove reservation from state
             */
            setReservations(prev =>
                prev.filter(
                    reservation =>
                        reservation.id !== reservationId
                )
            );

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to cancel the reservation."
            );
        }
    };


    /*
     * Loading
     */
    if (loading) {
        return (
            <div className="text-center py-16">

                <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>

                <p className="text-gray-500 text-sm mt-3">
                    Loading your student space...
                </p>

            </div>
        );
    }


    /*
     * Error
     */
    if (error) {
        return (
            <div className="max-w-2xl mx-auto mt-10">

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                </div>

            </div>
        );
    }


    return (
        <div className="space-y-8">


            {/* ============================= */}
            {/* HEADER */}
            {/* ============================= */}

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                    <div>

                        <span className="inline-block px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">

                            Student Portal

                        </span>

                        <h1 className="text-2xl font-bold text-gray-900 mt-2">

                            My Passes & Available Events

                        </h1>

                        <p className="text-sm text-gray-500 mt-1">

                            Manage your reservations and discover upcoming campus events.

                        </p>

                    </div>


                    <a
                        href="/"
                        className="inline-flex items-center text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-2 rounded-lg transition"
                    >

                        <i className="fa-solid fa-arrow-left mr-1.5"></i>

                        Back to Homepage

                    </a>

                </div>

            </div>



            {/* ============================= */}
            {/* MY RESERVATIONS */}
            {/* ============================= */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                <div className="p-5 border-b border-gray-200 bg-gray-50">

                    <h2 className="text-lg font-bold text-gray-900">

                        <i className="fa-solid fa-ticket text-indigo-600 mr-2"></i>

                        My Subscribed Events

                    </h2>

                    <p className="text-xs text-gray-500 mt-1">

                        Your reserved campus events.

                    </p>

                </div>


                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-4">

                    {reservations.length === 0 ? (

                        <div className="col-span-full text-center py-10">

                            <i className="fa-solid fa-ticket text-4xl text-gray-300"></i>

                            <p className="text-sm text-gray-500 mt-3">

                                You have not subscribed to any events yet.

                            </p>

                        </div>

                    ) : (

                        reservations.map((reservation) => {

                            const event = reservation.event;

                            return (

                                <div
                                    key={reservation.id}
                                    className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition"
                                >

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <h3 className="font-bold text-gray-900">

                                                {event?.title}

                                            </h3>

                                            <p className="text-xs text-gray-500 mt-1">

                                                <i className="fa-solid fa-location-dot mr-1"></i>

                                                {event?.location}

                                            </p>

                                        </div>


                                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">

                                            Subscribed

                                        </span>

                                    </div>


                                    <p className="text-xs text-gray-600 mt-4">

                                        {event?.description}

                                    </p>


                                    <div className="bg-gray-50 p-3 rounded-lg mt-4 text-xs space-y-1">

                                        <div className="flex justify-between">

                                            <span className="text-gray-400">
                                                Date:
                                            </span>

                                            <span className="font-semibold">
                                                {event?.date}
                                            </span>

                                        </div>


                                        <div className="flex justify-between">

                                            <span className="text-gray-400">
                                                Time:
                                            </span>

                                            <span className="font-semibold">
                                                {event?.time}
                                            </span>

                                        </div>

                                    </div>


                                    <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">

                                        <button
                                            onClick={() =>
                                                setSelectedReservation(
                                                    reservation
                                                )
                                            }
                                            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
                                        >

                                            <i className="fa-solid fa-ticket mr-1"></i>

                                            View Pass

                                        </button>


                                        <button
                                            onClick={() =>
                                                handleCancel(
                                                    reservation.id
                                                )
                                            }
                                            className="text-xs font-semibold text-red-500 hover:text-red-700"
                                        >

                                            Cancel

                                        </button>

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>

            </div>



            {/* ============================= */}
            {/* AVAILABLE EVENTS */}
            {/* ============================= */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                <div className="p-5 border-b border-gray-200 bg-gray-50">

                    <h2 className="text-lg font-bold text-gray-900">

                        <i className="fa-solid fa-calendar-plus text-indigo-600 mr-2"></i>

                        Available Events

                    </h2>

                    <p className="text-xs text-gray-500 mt-1">

                        Discover upcoming campus events.

                    </p>

                </div>


                <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {events.length === 0 ? (

                        <div className="col-span-full text-center py-10">

                            <p className="text-sm text-gray-500">

                                No events available.

                            </p>

                        </div>

                    ) : (

                        events.map((event) => {

                            /*
                             * Number of reservations
                             */
                            const reservationCount =
                                event.reservations_count ??
                                event.reservations?.length ??
                                0;

                            const availableSpots =
                                event.max_capacity -
                                reservationCount;


                            /*
                             * Check if current student
                             * already booked this event
                             */
                            const alreadySubscribed =
                                reservations.some(
                                    reservation =>
                                        reservation.event?.id === event.id
                                );


                            return (

                                <div
                                    key={event.id}
                                    className="border border-gray-200 rounded-xl p-5 hover:border-indigo-300 transition flex flex-col"
                                >

                                    {/* Title */}

                                    <div className="flex justify-between items-start gap-2">

                                        <h3 className="font-bold text-gray-900">

                                            {event.title}

                                        </h3>


                                        <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">

                                            {event.price > 0
                                                ? `$${Number(event.price).toFixed(2)}`
                                                : "Free"
                                            }

                                        </span>

                                    </div>


                                    {/* Description */}

                                    <p className="text-xs text-gray-600 mt-3 line-clamp-3">

                                        {event.description}

                                    </p>


                                    {/* Information */}

                                    <div className="space-y-2 mt-5 text-xs text-gray-500">

                                        <p>

                                            <i className="fa-solid fa-calendar text-indigo-500 w-4 mr-2"></i>

                                            {event.date}

                                        </p>


                                        <p>

                                            <i className="fa-solid fa-clock text-indigo-500 w-4 mr-2"></i>

                                            {event.time}

                                        </p>


                                        <p>

                                            <i className="fa-solid fa-location-dot text-indigo-500 w-4 mr-2"></i>

                                            {event.location}

                                        </p>


                                        <p>

                                            <i className="fa-solid fa-users text-indigo-500 w-4 mr-2"></i>

                                            {availableSpots} / {event.max_capacity} spots available

                                        </p>

                                    </div>


                                    {/* Button */}

                                    <div className="mt-auto pt-5">

                                        {alreadySubscribed ? (

                                            <button
                                                disabled
                                                className="w-full bg-emerald-500 text-white text-xs font-semibold py-2.5 rounded-lg"
                                            >

                                                <i className="fa-solid fa-check mr-1"></i>

                                                Subscribed

                                            </button>

                                        ) : availableSpots <= 0 ? (

                                            <button
                                                disabled
                                                className="w-full bg-gray-300 text-gray-600 text-xs font-semibold py-2.5 rounded-lg"
                                            >

                                                Event Full

                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    handleSubscribe(
                                                        event.id
                                                    )
                                                }
                                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-lg transition"
                                            >

                                                <i className="fa-solid fa-plus mr-1"></i>

                                                Subscribe to Event

                                            </button>

                                        )}

                                    </div>

                                </div>

                            );

                        })

                    )}

                </div>

            </div>



            {/* ============================= */}
            {/* TICKET MODAL */}
            {/* ============================= */}

            {selectedReservation && (

                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
                    onClick={() => setSelectedReservation(null)}
                >

                    <div
                        className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="flex justify-between items-center">

                            <h3 className="font-bold text-gray-900">

                                Digital Event Pass

                            </h3>


                            <button
                                onClick={() =>
                                    setSelectedReservation(null)
                                }
                                className="text-gray-400 hover:text-gray-600"
                            >

                                <i className="fa-solid fa-xmark"></i>

                            </button>

                        </div>


                        <div className="mt-5 bg-gray-50 border border-dashed border-gray-300 rounded-xl p-5 text-center">

                            <p className="text-xs font-bold text-indigo-600 uppercase">

                                {selectedReservation.event?.title}

                            </p>


                            {selectedReservation.ticket?.ticket_code && (

                                <>

                                    <div className="flex justify-center mt-4">

                                        <img
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                                                selectedReservation.ticket.ticket_code
                                            )}`}
                                            alt="Ticket QR Code"
                                            className="w-36 h-36 bg-white p-1 border rounded"
                                        />

                                    </div>


                                    <p className="text-xs font-mono text-gray-500 mt-3">

                                        {selectedReservation.ticket.ticket_code}

                                    </p>

                                </>

                            )}

                        </div>


                        <button
                            onClick={() => window.print()}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold py-2.5 rounded-lg mt-4"
                        >

                            <i className="fa-solid fa-print mr-1"></i>

                            Print / Save Pass

                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}