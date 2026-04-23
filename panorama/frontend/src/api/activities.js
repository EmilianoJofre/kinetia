import client from './client'

export const getActivities = (params) => client.get('/activities', { params }).then(r => r.data)
export const getActivity = (id) => client.get(`/activities/${id}`).then(r => r.data)
export const createActivity = (data) => client.post('/activities', data).then(r => r.data)
