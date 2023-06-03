import { useLoaderData, json, defer, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {

  const { events } = useLoaderData();
  return (
    <Suspense fallback={<p stlyle={{ textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>

  );
}

export default EventsPage;

async function loadEvents(){
  const response = await fetch('http://localhost:8080/events');
  if (!response.ok) {
    //return { isError: true, message: 'Something went wrong!' }
    // throw new Response(JSON.stringify({ message: 'Coud not fetch Events!' }), {
    //   status: 500,
    // })
    throw json(
      { message: 'Coud not fetch Events!' },
      {
        status: 500,
       }
       );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
 return defer({
    events: loadEvents(),
  });

}