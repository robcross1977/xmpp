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