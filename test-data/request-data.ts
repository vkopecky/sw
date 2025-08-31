export const requestData = {
    waypoint1: {
        name: 'Test Pickup Company 1724865423',
        street: 'Pickup Street 123',
        city: 'Bratislava',
        country: 'Slovakia',
        zip: '84104',
        contact: 'John Pickup',
        email: 'pickup@test.com',
        phone: '+421900123456',
        reference: 'PICKUP-REF-1724865423',
        note: 'Please handle with care.'
    },
    waypoint2: {
        name: 'Test Delivery Company 1724865423',
        street: 'Delivery Street 456',
        city: 'Košice',
        country: 'Slovakia',
        zip: '04001',
        contact: 'Jane Delivery',
        email: 'delivery@test.com',
        phone: '+421900654321',
        reference: 'DELIVERY-REF-1724865423',
        note: 'Leave at the reception if not available.'
    },
    cargo: {
        description: 'Electronics and computer parts - fragile equipment',
        type: 'Other',
        requestType: 'Full Truck Load',
        weight: '2500',
        value: '50000',
        length: '500',
        note: 'Please handle cargo with extreme care. All items are fragile electronic equipment.'
    },
    request: {
        transportType: 'Spot transport',
        carrier: 'Demo carrier',
        responsible: 'Vlado Kopecky',
        duration: '30 min'
    },
    dates: {
        pickup: {
            earliest: () => {
                const date = new Date();
                // Add 10 minutes to current time and round to nearest 5 minutes
                date.setMinutes(date.getMinutes() + 10);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            },
            latest: () => {
                const date = new Date();
                // Add 70 minutes to current time (1 hour + 10 minutes) and round to nearest 5 minutes
                date.setMinutes(date.getMinutes() + 70);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            }
        },
        delivery: {
            earliest: () => {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                // Add 10 minutes to current time and round to nearest 5 minutes
                date.setMinutes(date.getMinutes() + 10);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            },
            latest: () => {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                // Add 70 minutes to current time (1 hour + 10 minutes) and round to nearest 5 minutes
                date.setMinutes(date.getMinutes() + 70);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            }
        }
    }
};
