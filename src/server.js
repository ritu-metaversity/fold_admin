// src/server.js

const server = {
    subscribe: async (subscription) => {
        try {
            const response = await fetch('https://adminapi.bhaubook247.com/admin-new-apis/notification/subscribe', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(subscription),
            });

            if (!response.ok) {
                throw new Error('Failed to subscribe');
            }

            console.log('Subscription successfully sent to the server');
        } catch (error) {
            console.error('Error subscribing to push notifications:', error);
        }
    },
};

export { server };
