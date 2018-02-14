import Handler from './handler';
export default class JoinedSpecificRoomHandler extends Handler<string> {
    constructor(roomName: string);
    handler: (data: any) => void;
}
