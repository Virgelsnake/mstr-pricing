# Frontend Caching Implementation

## Overview

This document describes the implementation of frontend caching for the MSTR Calculator application. The caching mechanism stores model coefficients in the browser's local storage to improve performance and reduce unnecessary API calls.

## Features

1. **Local Storage Caching**
   - Model coefficients are stored in the browser's local storage after the initial fetch
   - Cached data is used on subsequent page loads, eliminating the need for redundant API calls
   - Timestamp of last update is stored alongside the coefficients

2. **Manual Refresh**
   - A "Refresh Model" button allows users to manually fetch the latest model coefficients
   - Visual feedback is provided during the refresh process

3. **Timestamp Display**
   - The UI displays when the model coefficients were last updated
   - Provides transparency to users about the freshness of the data

## Implementation Details

### Storage Keys

- `mstr_model_coefficients`: Stores the model coefficients as a JSON string
- `mstr_model_last_updated`: Stores the timestamp of the last update

### Caching Logic
1. On page load, the application first attempts to load coefficients from local storage
2. If cached data exists, it's used immediately
3. If no cached data exists, or if the user clicks the refresh button, a fetch request is made to the API
4. When new data is fetched from the API, it's saved to local storage with the current timestamp

## Error Handling

The implementation includes robust error handling for various scenarios:

1. **API Request Failures**
   - If the API request fails, an error message is displayed to the user
   - The application continues to use cached data if available
   - The UI remains responsive and usable

2. **Local Storage Unavailability**
   - If local storage is unavailable (e.g., private browsing mode, storage quota exceeded)
   - The application gracefully falls back to fetching from the API
   - Error is logged to the console but not exposed to the user

3. **Invalid Cache Data**
   - If the cached data is corrupted or in an unexpected format
   - The application clears the invalid cache and fetches fresh data from the API

## Edge Cases and Considerations

1. **First-time Users**
   - New users with no cached data will experience a slight delay on their first visit
   - The loading indicator provides feedback during this initial load

2. **Stale Data**
   - Users who don't manually refresh may have outdated coefficients
   - The timestamp display helps users identify when data might be stale
   - Consider implementing an auto-refresh mechanism in future versions

3. **Storage Limitations**
   - Local storage has size limitations (typically 5-10MB)
   - Current implementation uses minimal storage (< 1KB)
   - No concerns about exceeding limits with the current data model

4. **Privacy Modes**
   - Private browsing modes may restrict or clear local storage
   - Implementation gracefully handles this by falling back to API requests

## Testing

The frontend caching implementation has been tested for:

1. **Functionality**
   - Saving and loading from local storage
   - Displaying the correct timestamp
   - Refreshing data when requested

2. **Error Handling**
   - API failures
   - Local storage unavailability
   - Timeout scenarios

3. **User Experience**
   - Visual feedback during loading and refresh
   - Clear indication of data freshness

## Future Improvements

1. **Automatic Refresh**
   - Implement periodic background refresh of coefficients
   - Allow users to configure refresh frequency

2. **Offline Support**
   - Enhance the application to work fully offline using cached data
   - Add visual indicators for offline mode

3. **Cache Expiration**
   - Implement a TTL (Time To Live) for cached data
   - Automatically refresh when cache expires

4. **Sync Across Devices**
   - Consider using more advanced storage solutions for cross-device synchronization
