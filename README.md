# Streaming Application

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Features

- **Live Chat**: Real-time chat functionality using `livekit-client` and `@livekit/components-react`. The chat component is implemented in `components/stream/chat.tsx` (startLine: 1, endLine: 85).
- **Chat List**: Displays a list of chat messages with a skeleton loader for loading states. Implemented in `components/stream/chat-list.tsx` (startLine: 1, endLine: 39).
- **UI Components**: Custom UI components like `Alert`, `Dialog`, and `Select` are implemented in `components/ui/alert.tsx` and `components/ui/dialog.tsx`.
- **User Management**: User authentication and management using `@clerk/nextjs` and `@clerk/themes` as seen in `app/layout.tsx`.
- **Streaming**: Live video streaming capabilities using `livekit-client` and `livekit-server-sdk`, with components like `components/stream/live-video.tsx` and `actions/ingress.ts` handling video and ingress functionalities.
- **Stream Management**: Users can manage their streams, including updating stream settings and handling ingress connections. Implemented in `actions/stream.ts` (startLine: 1, endLine: 46).
- **Webhook Integration**: Webhooks for handling events from LiveKit and Clerk, allowing for real-time updates and user management. Implemented in `app/api/webhooks/livekit/route.ts` (startLine: 1, endLine: 44) and `app/api/webhooks/clerk/route.ts` (startLine: 1, endLine: 70).
- **Responsive Design**: The application is designed to be responsive, with components adapting to different screen sizes, as seen in `components/stream/index.tsx` (startLine: 1, endLine: 107).


## Development

This project uses the following technologies:

- **Next.js**: A React framework for production.
- **Clerk**: For authentication and user management.
- **LiveKit**: For real-time audio and video streaming.
- **Prisma**: As the ORM for database interactions.
- **Tailwind CSS**: For styling components.

### Key Components

- **Chat Component**: Handles chat functionalities, including sending and receiving messages, and is responsive to screen size changes.
- **Connect Modal**: Allows users to generate a connection for streaming, with options for RTMP and WHIP ingress types. Implemented in `app/(dashboard)/u/[username]/keys/_components/connect-modal.tsx` 
- **Follow Service**: Manages user follow and unfollow actions, ensuring users cannot follow themselves or users who have blocked them. Implemented in `lib/follow-service.ts` 

### Additional Information

- This project is configured to use a PostgreSQL database, as defined in `prisma/schema.prisma` 
- The project includes a custom alert system using `class-variance-authority` for styling, as seen in `components/ui/alert.tsx`.
## Contributing

Contributions are welcome! Please check out the [Next.js GitHub repository](https://github.com/vercel/next.js/) for more information on how to contribute.

## License

This project is licensed under the MIT License.
