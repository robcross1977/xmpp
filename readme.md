# A usage example.
### This creates a muc room, configures it to be persistant and anonymous and then destroys it

```
let createdRoomName: string = '';
const xmpp = new Xmpp();

const opts = {
    jid: 'admin@murderbeard.com',
    password: 'd00d0012',
    transport: 'websocket',
    wsURL: 'ws://murderbeard.com:5280/websocket'
} as ConnectionOptions;

xmpp.create(opts);
xmpp.subscribe('session:started').subscribe({
    next: data => {
        xmpp.muc.createPersistantAnonRoom('admin')
            .then(roomName => {
                 console.log(`${roomName} created`)
                 createdRoomName = roomName;
            })
            .then(() => {
                xmpp.muc.destroyRoom(createdRoomName)
                    .then(() => {
                        console.log(`Room ${createdRoomName} destroyed`);
                    });
            })
            .catch(err => console.error(err));

        setInterval(() => xmpp.disconnect(), 5000);
    }
});

xmpp.subscribe('disconnected').subscribe({
    next: data => {
        process.exit(0);
    }
});

xmpp.connect();
```


# EventHandlers
So I switched this over to using Observers instead of EventEmitters for some of the "collection" type functions and the fact that xmpp sometimes requires you to treat several requests as one and functions like switchMap and the like make this happen.

What I do, is I have a handler for the type of events that Stanza.io emits that I am interested in (there are others I don't catch). When I recieve one of these from the stanza client I call the Observer.next on the Observer it is tied to so that you can use them as collections.

Please note, I have a funky thing in the mucJoinHandler. When you join a muc room I need it to fire so I can handle some other events, for instance, leaving the room I just configured becasue there is a limit to how many rooms a single user can be in and I am making all of the rooms with the same user. 