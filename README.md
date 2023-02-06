# `event-dispatcher`

Fully typed event dispatcher.

---

## Simple usage example:

Within your class:

```ts
// [1] Define events and payloads
type ConnectionEvent = {
    "connect": { id: string, timestamp: number },
    "disconnect": { id: string, timestamp: number, reason?: string },
};

// [2] Extend your class
class Connection extends EventDispatcher<ConnectionEvent> {
    constructor() { super(); }

    private dispatchDisconnect() {
        // [3] Call dispatch
        this.dispatch(
            "disconnect",
            { id: "abcdefg", timestamp: 1675644952, reason: "timed out" },
        );
    }
}
```

From calling code:

```ts
function handleDisconnect(ev: ConnectionEvent["disconnect"]) {
    console.log("Disconnected:", ev.id, ev.timestamp, ev.reason);
}

const connection = new Connection();

connection.addEventListener("disconnect", handleDisconnect);
```

## API

### Public
- `EventDispatcher.addEventListener(name, func)`
- `EventDispatcher.removeEventListener(name, func)`
- `EventDispatcher.removeAllEventListeners()`

### Protected
- `EventDispatcher.dispatch(name, payload)`