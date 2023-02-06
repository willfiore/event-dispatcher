export class EventDispatcher<
    Events extends { [key: string]: { [key: string]: any } },
> {
    private eventListeners: {
        [key in keyof Events]?: ((event: Events[key]) => void)[]
    } = {};

    addEventListener<
        Key extends keyof Events,
    >(
        key: Key,
        listener: (event: Events[Key]) => void,
    ) {
        const listeners = this.eventListeners[key];

        if (listeners === undefined) {
            this.eventListeners[key] = [listener];
        } else {
            listeners.push(listener);
        }
    }

    removeEventListener<
        Key extends keyof Events,
    >(
        key: Key,
        listener: (event: Events[Key]) => void,
    ) {
        const idx = this.eventListeners[key]?.findIndex(a => a === listener) ?? -1;
        if (idx === -1) { return; }

        this.eventListeners[key]?.splice(idx, 1);
    }

    removeAllEventListeners() {
        this.eventListeners = {};
    }

    protected dispatch<
        Key extends keyof Events
    >(
        key: Key, payload: Events[Key]
    ) {
        this.eventListeners[key]?.forEach(listener => {
            listener(payload);
        });
    }
}
