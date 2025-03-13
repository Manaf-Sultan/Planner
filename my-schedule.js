document.addEventListener('DOMContentLoaded', () => {
  console.log("Loading my schedule...");

  // Check authentication
  const user = checkAuth();
  if (!user) return;

  // Initialize loader
  const loader = document.querySelector('.loader');
  loader.classList.remove('d-none');

  try {
    // Filter events for the logged-in user
    const allEvents = JSON.parse(localStorage.getItem('schedule')) || [];
    const userEvents = allEvents.filter(event => 
      event.title && event.title.includes(JSON.parse(user).name)
    );

    // Initialize calendar
    const calendarEl = document.getElementById('my-calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      events: userEvents,
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth'
      },
      loading: (isLoading) => {
        loader.classList.toggle('d-none', !isLoading);
        console.log(`My Schedule loading: ${isLoading}`);
      }
    });

    calendar.render();
    console.log("My Schedule initialized.");

  } catch (error) {
    console.error("Failed to load schedule:", error);
    alert("Error loading your schedule. Check console for details.");

  } finally {
    loader.classList.add('d-none');
  }
});
