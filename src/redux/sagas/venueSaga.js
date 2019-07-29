import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchVenues() {
    try {
        const venueListResponse = yield axios.get('/api/venues')
        yield put({type: 'SET_VENUE_LIST', payload: venueListResponse.data})
    } catch (error) {
        // add error handling for issue with fetching venues
        console.log(error);
    }
}

function* fetchSelectedVenue(action) {
    // payload should be a single id - not in an object
    try {
        const selectedVenue = yield axios.get(`/api/venues/selected/${action.payload}`)
        yield put({type: 'SET_SELECTED_VENUE', payload: selectedVenue.data})
    } catch (error) {
        console.log('Error in fetching selected venue info.', error)
    }
}

function* venueSaga() {
    yield takeLatest('FETCH_VENUE_LIST', fetchVenues);
    yield takeLatest('FETCH_SELECTED_VENUE', fetchSelectedVenue)
}

export default venueSaga