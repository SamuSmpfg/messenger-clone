import Pusher from 'pusher-js';

const pusherClient = typeof window !== 'undefined'
  ? new Pusher(
    process.env.NEXT_PUBLIC_PUSHER_APP_KEY!,
    {
      channelAuthorization: {
        endpoint: '/api/pusher/auth',
        transport: 'ajax'
      },
      cluster: 'us2',
    }
  )
  : (null as unknown as Pusher);

export default pusherClient;