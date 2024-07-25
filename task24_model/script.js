document.addEventListener("DOMContentLoaded", () => {
    const invitationForm = document.getElementById("invitationForm");
    const invitationList = document.getElementById("invitationList");
    const responseStats = document.getElementById("responseStats");
    const eventStats = document.getElementById("eventStats");
    let invitations = {};
    let events = {};
  
    invitationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const guestEmail = document.getElementById("guestEmail").value;
      const eventName = document.getElementById("eventName").value;
      const showDetails = document.getElementById("showDetails").value;
      sendInvitation(guestEmail, eventName, showDetails);
    });
  
    function sendInvitation(email, eventName, details) {
      if (validateEmail(email)) {
        if (!invitations[eventName]) {
          invitations[eventName] = [];
        }
        invitations[eventName].push({ email, details, status: "Pending" }); // Start with Pending status
        if (!events[eventName]) {
          events[eventName] = { sent: 0, accepted: 0, declined: 0 };
        }
        events[eventName].sent++;
        updateInvitationList();
        updateResponseStats();
        updateEventStats();
      } else {
        alert("Invalid email address.");
      }
    }
  
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  
    function updateInvitationList() {
      invitationList.innerHTML = "";
      Object.keys(invitations).forEach((eventName) => {
        const eventDiv = document.createElement("div");
        eventDiv.innerHTML = `<h2>${eventName}</h2>`;
        invitations[eventName].forEach((invitation, index) => {
          const invitationDiv = document.createElement("div");
          invitationDiv.className = "invitation";
          invitationDiv.innerHTML = `
                      <p>Email: ${invitation.email}</p>
                      <p>Details: ${invitation.details}</p>
                      <p>Status: ${invitation.status}</p>
                      <button class="accept-button">Accept</button>
                      <button class="decline-button">Decline</button>
                  `;
          const acceptButton = invitationDiv.querySelector(".accept-button");
          const declineButton = invitationDiv.querySelector(".decline-button");
  
          acceptButton.addEventListener("click", () => {
            console.log(events)
            if (invitation.status !== "Accepted") { // Only update if not already accepted
              if (invitation.status === "Declined") {
                events[eventName].declined--;
              }
              invitation.status = "Accepted";
              events[eventName].accepted++;
              updateInvitationList(); // Refresh the list to reflect changes
              updateResponseStats();
              updateEventStats();
            }
          });
  
          declineButton.addEventListener("click", () => {
            console.log(events)
            if (invitation.status !== "Declined") { // Only update if not already declined
              if (invitation.status === "Accepted") {
                events[eventName].accepted--;
              }
              invitation.status = "Declined";
              events[eventName].declined++;
              updateInvitationList(); // Refresh the list to reflect changes
              updateResponseStats();
              updateEventStats();
            }
          });
  
          eventDiv.appendChild(invitationDiv);
        });
        invitationList.appendChild(eventDiv);
      });
    }
  
    function updateResponseStats() {
      let totalSent = 0;
      let totalAccepted = 0;
      let totalDeclined = 0;
  
      Object.values(events).forEach(event => {
        totalSent += event.sent;
        totalAccepted += event.accepted;
        totalDeclined += event.declined;
      });
  
      const responseRate = ((totalAccepted + totalDeclined) / totalSent) * 100 || 0; // Avoid division by zero
      const acceptanceRate = (totalAccepted / totalSent) * 100 || 0;
  
      responseStats.innerHTML = `
              <p>Sent Invitations: ${totalSent}</p>
              <p>Accepted Invitations: ${totalAccepted}</p>
              <p>Declined Invitations: ${totalDeclined}</p>
              <p>Response Rate: ${responseRate.toFixed(2)}%</p>
              <p>Acceptance Rate: ${acceptanceRate.toFixed(2)}%</p>
          `;
    }
  
    function updateEventStats() {
      eventStats.innerHTML = "";
      Object.keys(events).forEach((eventName) => {
        const eventDiv = document.createElement("div");
        eventDiv.innerHTML = `
                  <h2>${eventName}</h2>
                  <p>Sent Invitations: ${events[eventName].sent}</p>
                  <p>Accepted Invitations: ${events[eventName].accepted}</p>
                  <p>Declined Invitations: ${events[eventName].declined}</p>
              `;
        eventStats.appendChild(eventDiv);
      });
    }
  });