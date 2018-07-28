server.define("sessions", {
    ctor: (data) =>
    {
        data.sessions = {}
        data.timeouts = {}
    }
})