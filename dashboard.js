document.addEventListener('DOMContentLoaded', () => {
  const user = checkAuth();
  if (user.role === 'admin') {
    // Add admin-specific features here
    console.log("Admin access detected.");
  }
});

document.addEventListener('DOMContentLoaded', () => {
  console.log("Initializing dashboard...");
  
  // Check authentication
  checkAuth();

  // Initialize calendar
  const calendarEl = document.getElementById('calendar');
  const loader = document.querySelector('.loader');

  try {
    const calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'timeGridWeek',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek,dayGridMonth'
      },
      events: JSON.parse(localStorage.getItem('schedule')) || [],
      editable: true,
      droppable: true,
      loading: (isLoading) => {
        loader.classList.toggle('d-none', !isLoading);
        console.log(`Calendar loading: ${isLoading}`);
      }
    });

    calendar.render();
    console.log("Calendar initialized.");

  } catch (error) {
    console.error("Failed to load calendar:", error);
    alert("Error loading dashboard. Check console for details.");
  }
});
