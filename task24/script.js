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
      invitations[eventName].push({ email, details, status: "Sent" });
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
        invitationDiv
          .querySelector(".accept-button")
          .addEventListener("click", () => {
            invitation.status = "Accepted";
            events[eventName].accepted++;
            events[eventName].sent--;
            updateInvitationList();
            updateResponseStats();
            updateEventStats();
          });
        invitationDiv
          .querySelector(".decline-button")
          .addEventListener("click", () => {
            invitation.status = "Declined";
            events[eventName].declined++;
            events[eventName].sent--;
            updateInvitationList();
            updateResponseStats();
            updateEventStats();
          });
        eventDiv.appendChild(invitationDiv);
      });
      invitationList.appendChild(eventDiv);
    });
  }

  function updateResponseStats() {
    const sentInvitations = Object.values(events).reduce(
      (acc, event) => acc + event.sent,
      0
    );
    const acceptedInvitations = Object.values(events).reduce(
      (acc, event) => acc + event.accepted,
      0
    );
    const declinedInvitations = Object.values(events).reduce(
      (acc, event) => acc + event.declined,
      0
    );
    const responseRate =
      ((acceptedInvitations + declinedInvitations) /
        (sentInvitations + acceptedInvitations + declinedInvitations)) *
      100;
    const acceptanceRate =
      (acceptedInvitations /
        (sentInvitations + acceptedInvitations + declinedInvitations)) *
      100;
    responseStats.innerHTML = `
            <p>Sent Invitations: ${sentInvitations}</p>
            <p>Accepted Invitations: ${acceptedInvitations}</p>
            <p>Declined Invitations: ${declinedInvitations}</p>
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
