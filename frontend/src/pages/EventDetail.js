import { useRouteLoaderData, json, redirect} from "react-router-dom"
import EventItem from "../components/EventItem";

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  return (
   <EventItem event={data.event}/>
  )
}

export default EventDetailPage;

export async function loader({request, params}) {

  const response = await fetch(`http://localhost:8080/events/${params.eventId}`);
  if (!response.ok) {
    //return { isError: true, message: 'Something went wrong!' }
    // throw new Response(JSON.stringify({ message: 'Coud not fetch Events!' }), {
    //   status: 500,
    // })
    throw json(
      { message: 'Coud not fetch details for the selected event!' },
      {
        status: 500,
       }
       );
  } else {
    return response
  }
}

export async function action({request, params}) {
  const eventId = params.eventId;
  const response = await fetch(`http://localhost:8080/events/${eventId}`,
  {
    method: request.method,
    });
  if (!response.ok) {
    throw json({status: 500, message: "Failed to delete event"});
  }
  return redirect(`/events`);
}
