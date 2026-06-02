class Peerservice{
    constructor(){
        if(!this.peer)
        {
            this.peer=new RTCPeerConnection({
                iceServers:[{
                    urls:[
                        'stun:stun.l.google.com:19302',
                        'stun:global.stun.twilio.com:3478'
                    ],  
                },
            ],
            });
        }
    }
}

async function getOffer(){
    if(this.peer)
    {
        const offer=await this.peer.createOffer();
        await this.peer.setLocalDescription(new RTCSessionDescription(offer));
        return offer;
    }
}

export default Peerservice();