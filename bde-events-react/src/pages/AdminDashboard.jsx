import { useEffect, useState } from "react";
import api from "../services/api";

export default function AdminDashboard() {

    const [events, setEvents] = useState([]);

    const [stats, setStats] = useState({
        totalEvents: 0,
        totalReservations: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    const [selectedEvent, setSelectedEvent] = useState(null);

    /*
     * Create event form
     */
    const [form, setForm] = useState({
        title: "",
        date: "",
        time: "",
        price: "",
        max_capacity: "",
        location: "",
        description: ""
    });


    /*
     * Load dashboard data
     */
    useEffect(() => {
        fetchDashboard();
    }, []);


    const fetchDashboard = async () => {

        try {

            setLoading(true);

            const response = await api.get("/admin/events/stats");

            console.log("Dashboard:", response.data);

            /*
             * Adjust these according to your actual API response.
             */
            setEvents(response.data.events || []);

            setStats({
                totalEvents: response.data.totalEvents || 0,
                totalReservations: response.data.totalReservations || 0
            });

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to load the admin dashboard."
            );

        } finally {

            setLoading(false);

        }
    };


    /*
     * Handle input changes
     */
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };


    /*
     * Create event
     */
    const handleCreate = async (e) => {

        e.preventDefault();

        try {

            await api.post("/admin/events", {
                title: form.title,
                date: form.date,
                time: form.time,
                price: form.price,
                max_capacity: form.max_capacity,
                location: form.location,
                description: form.description
            });

            setShowCreateModal(false);

            resetForm();

            await fetchDashboard();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to create the event."
            );

        }
    };


    /*
     * Open edit modal
     */
    const openEditModal = (event) => {

        setSelectedEvent(event);

        setForm({
            title: event.title || "",
            date: event.date || "",
            time: event.time?.substring(0, 5) || "",
            price: event.price || "",
            max_capacity: event.max_capacity || "",
            location: event.location || "",
            description: event.description || ""
        });

        setShowEditModal(true);
    };


    /*
     * Update event
     */
    const handleUpdate = async (e) => {

        e.preventDefault();

        try {

            await api.put(
                `/admin/events/${selectedEvent.id}`,
                form
            );

            setShowEditModal(false);

            resetForm();

            await fetchDashboard();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update the event."
            );

        }
    };


    /*
     * Delete event
     */
    const handleDelete = async (eventId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this event?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/admin/events/${eventId}`
            );

            await fetchDashboard();

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to delete the event."
            );
        }
    };


    /*
     * Reset form
     */
    const resetForm = () => {

        setForm({
            title: "",
            date: "",
            time: "",
            price: "",
            max_capacity: "",
            location: "",
            description: ""
        });

        setSelectedEvent(null);
    };


    if (loading) {

        return (
            <div className="text-center py-16">

                <i className="fa-solid fa-spinner fa-spin text-3xl text-indigo-600"></i>

                <p className="text-gray-500 text-sm mt-3">
                    Loading admin dashboard...
                </p>

            </div>
        );
    }


    if (error) {

        return (
            <div className="max-w-3xl mx-auto mt-10">

                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                    {error}
                </div>

            </div>
        );
    }


    return (
        <div className="space-y-6">


            {/* ============================= */}
            {/* HEADER */}
            {/* ============================= */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 border border-gray-200 rounded-xl shadow-sm">

                <div>

                    <div className="flex items-center gap-2">

                        <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">

                            Admin Portal

                        </span>

                        <span className="text-xs text-gray-500">

                            Overview & Management

                        </span>

                    </div>


                    <h1 className="text-2xl font-bold text-gray-900 mt-1">

                        BDE Event Control Center

                    </h1>

                </div>


                <button
                    onClick={() => {
                        resetForm();
                        setShowCreateModal(true);
                    }}
                    className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition shadow-sm"
                >

                    <i className="fa-solid fa-plus mr-2 text-xs"></i>

                    Create New Event

                </button>

            </div>


            {/* ============================= */}
            {/* STATISTICS */}
            {/* ============================= */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">


                {/* Total Events */}

                <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">

                    <div>

                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">

                            Total Events

                        </p>

                        <p className="text-2xl font-black text-gray-900 mt-1">

                            {stats.totalEvents}

                        </p>

                    </div>


                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-xl">

                        <i className="fa-solid fa-calendar-days"></i>

                    </div>

                </div>


                {/* Reservations */}

                <div className="bg-white p-5 border border-gray-200 rounded-xl shadow-sm flex items-center justify-between">

                    <div>

                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">

                            Reservations

                        </p>

                        <p className="text-2xl font-black text-gray-900 mt-1">

                            {stats.totalReservations}

                        </p>

                    </div>


                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center text-xl">

                        <i className="fa-solid fa-ticket"></i>

                    </div>

                </div>

            </div>


            {/* ============================= */}
            {/* EVENTS TABLE */}
            {/* ============================= */}

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">

                <div className="p-5 border-b border-gray-200">

                    <h2 className="text-lg font-bold text-gray-900">

                        Manage Campus Events

                    </h2>

                    <p className="text-xs text-gray-500">

                        Monitor active reservations and update event availability

                    </p>

                </div>


                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead>

                        <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">

                            <th className="py-3 px-4">
                                Event
                            </th>

                            <th className="py-3 px-4">
                                Date
                            </th>

                            <th className="py-3 px-4">
                                Location
                            </th>

                            <th className="py-3 px-4">
                                Capacity
                            </th>

                            <th className="py-3 px-4">
                                Creator
                            </th>

                            <th className="py-3 px-4 text-right">
                                Actions
                            </th>

                        </tr>

                        </thead>


                        <tbody className="divide-y divide-gray-200 text-sm">

                        {events.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="6"
                                    className="py-8 text-center text-gray-500"
                                >
                                    No events available.
                                </td>

                            </tr>

                        ) : (

                            events.map((event) => {

                                const booked =
                                    event.reservations_count ??
                                    event.reservations?.length ??
                                    0;

                                return (

                                    <tr
                                        key={event.id}
                                        className="hover:bg-gray-50 transition"
                                    >

                                        <td className="py-3 px-4">

                                            <div className="font-bold text-gray-900">

                                                {event.title}

                                            </div>

                                        </td>


                                        <td className="py-3 px-4 text-xs">

                                            <div className="font-semibold">

                                                {event.date}

                                            </div>

                                            <div className="text-gray-500">

                                                {event.time?.substring(0, 5)}

                                            </div>

                                        </td>


                                        <td className="py-3 px-4 text-xs text-gray-500">

                                            {event.location}

                                        </td>


                                        <td className="py-3 px-4">

                                                <span className="font-semibold">

                                                    {booked} / {event.max_capacity}

                                                </span>

                                        </td>


                                        <td className="py-3 px-4">

                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">

                                                    {event.user?.name || "Unknown"}

                                                </span>

                                        </td>


                                        <td className="py-3 px-4 text-right space-x-3">

                                            <button
                                                onClick={() =>
                                                    openEditModal(event)
                                                }
                                                className="text-gray-400 hover:text-indigo-600 transition"
                                                title="Edit Event"
                                            >

                                                <i className="fa-solid fa-pen-to-square"></i>

                                            </button>


                                            <button
                                                onClick={() =>
                                                    handleDelete(event.id)
                                                }
                                                className="text-gray-400 hover:text-red-600 transition"
                                                title="Delete Event"
                                            >

                                                <i className="fa-solid fa-trash"></i>

                                            </button>

                                        </td>

                                    </tr>

                                );

                            })

                        )}

                        </tbody>

                    </table>

                </div>

            </div>


            {/* CREATE MODAL */}

            {showCreateModal && (

                <EventModal
                    title="Create Campus Event"
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleCreate}
                    close={() => {
                        setShowCreateModal(false);
                        resetForm();
                    }}
                    submitText="Publish Event"
                />

            )}


            {/* EDIT MODAL */}

            {showEditModal && (

                <EventModal
                    title="Edit Event"
                    form={form}
                    handleChange={handleChange}
                    handleSubmit={handleUpdate}
                    close={() => {
                        setShowEditModal(false);
                        resetForm();
                    }}
                    submitText="Update Event"
                />

            )}

        </div>
    );
}


/*
 * Reusable Event Modal
 */

function EventModal({
                        title,
                        form,
                        handleChange,
                        handleSubmit,
                        close,
                        submitText
                    }) {

    return (

        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
            onClick={close}
        >

            <div
                className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-4">

                    <h3 className="text-lg font-bold text-gray-900">

                        {title}

                    </h3>


                    <button
                        onClick={close}
                        className="text-gray-400 hover:text-gray-600"
                    >

                        <i className="fa-solid fa-xmark text-lg"></i>

                    </button>

                </div>


                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >

                    <div>

                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">

                            Event Title

                        </label>

                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                    </div>


                    <div className="grid grid-cols-2 gap-3">

                        <div>

                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">

                                Date

                            </label>

                            <input
                                type="date"
                                name="date"
                                value={form.date}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                            />

                        </div>


                        <div>

                            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">

                                Capacity

                            </label>

                            <input
                                type="number"
                                name="max_capacity"
                                min="1"
                                value={form.max_capacity}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                            />

                        </div>

                    </div>


                    <div>

                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">

                            Time

                        </label>

                        <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                        />

                    </div>


                    <div>

                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">

                            Price

                        </label>

                        <input
                            type="number"
                            name="price"
                            step="0.01"
                            min="0"
                            value={form.price}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                        />

                    </div>


                    <div>

                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">

                            Location

                        </label>

                        <input
                            type="text"
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                        />

                    </div>


                    <div>

                        <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">

                            Description

                        </label>

                        <textarea
                            name="description"
                            rows="3"
                            value={form.description}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-md py-2 px-3 text-sm"
                        />

                    </div>


                    <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">

                        <button
                            type="button"
                            onClick={close}
                            className="px-4 py-2 border border-gray-300 rounded-md text-xs font-semibold text-gray-700 hover:bg-gray-50"
                        >

                            Cancel

                        </button>


                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-xs font-semibold"
                        >

                            {submitText}

                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}