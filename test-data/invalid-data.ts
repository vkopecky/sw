export const invalidData = {
    waypoint1: {
        name: '<script>alert("XSS")</script>',
        street: '!@#$%^&*()',
        city: '',
        country: 'InvalidCountry',
        zip: 'invalid-zip',
        contact: '12345',
        email: 'invalid.email@',
        phone: 'abcd',
        reference: '<b>Bold Reference</b>',
        note: 'a'.repeat(1000)
    },
    waypoint2: {
        name: "'; DROP TABLE users; --",
        street: '',
        city: '   Multiple    Spaces   ',
        country: 'NonexistentCountry',
        zip: '123-invalid',
        contact: '123456',
        email: 'not.an.email',
        phone: 'phone123',
        reference: 'Line 1\nLine 2',
        note: '<b>Bold Note</b> & Special Chars 城市'
    },
    dates: {
        pickup: {
            earliest: () => {
                const date = new Date();
                // Add 70 minutes to make earliest later than latest
                date.setMinutes(date.getMinutes() + 70);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            },
            latest: () => {
                const date = new Date();
                // Add only 10 minutes to make latest earlier than earliest
                date.setMinutes(date.getMinutes() + 10);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            }
        },
        delivery: {
            earliest: () => {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                // Add 70 minutes to make earliest later than latest
                date.setMinutes(date.getMinutes() + 70);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            },
            latest: () => {
                const date = new Date();
                date.setDate(date.getDate() + 1);
                // Add only 10 minutes to make latest earlier than earliest
                date.setMinutes(date.getMinutes() + 10);
                date.setMinutes(Math.ceil(date.getMinutes() / 5) * 5);
                return date;
            }
        }
    }
};
