import client from './client'

export const getBookings = () => client.get('/bookings').then(r => r.data)
export const createBooking = (data) => client.post('/bookings', data).then(r => r.data)
