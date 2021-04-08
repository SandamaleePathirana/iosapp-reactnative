export async function saveDeal(
  image1,
  image2,
  image3,
  category,
  description,
  url,
  comments,
  location,
  userId,
  storeName,
  price,
) {
  try {
    const data = new FormData();
    if (image1 !== '')
      data.append('Image1', {
        uri: image1,
        name: image1.split('/').pop(),
        type: 'image/png',
      });
    if (image2 !== '')
      data.append('Image2', {
        uri: image2,
        name: image2.split('/').pop(),
        type: 'image/png',
      });
    if (image3 !== '')
      data.append('Image3', {
        uri: image3,
        name: image3.split('/').pop(),
        type: 'image/png',
      });
    data.append('Category', category);
    data.append('Description', description);
    data.append('Url', url);
    data.append('Comments', comments);
    data.append('UserId', userId);
    data.append('StoreName', storeName);
    data.append('Price', price);

    if (location) {
      data.append('Latitude', location.coords.latitude);
      data.append('Longitude', location.coords.longitude);
      data.append('Altitude', location.coords.altitude);
      data.append('AltitudeAccuracy', location.coords.altitudeAccuracy);
      data.append('Accuracy', location.coords.accuracy);
      data.append('Heading', location.coords.heading);
      data.append('Speed', location.coords.speed);
      data.append('Timestamp', location.timestamp);
    }

    const response = await fetch(
      'https://dealsy-deal-function.azurewebsites.net/api/dealsydealinitialprocessorfunction?code=DQrAF8RYhn1eiiHhz3OiuHedjZUdTWx/tnu/POaKxldH9LwDKfJAtg==',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      },
    );

    const json = await response.json();
  } catch (error) {
    throw error;
  }
}

export async function searchDeals(latitude, longitude, category) {
  let url =
    'https://dealsy-deal-search-function.azurewebsites.net/api/dealsydealsearchfunction?code=nC5auq6N8WEk5vv0lOvqWwooLWMxv4ybWg2uHyqK5iGM8LrTGzsrgw==';

  if (latitude && longitude) {
    url = url + `&coordinates=${latitude},${longitude}`;
  }

  if (category) {
    url = url + `&category=${category}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  return await response.json();
}

export async function getLocationInformation(latitude, longitude) {
  if (latitude !== 0 && longitude !== 0) {
    let url = `https://revgeocode.search.hereapi.com/v1/revgeocode?at=${latitude},${longitude}&apikey=iOqng09WWzfouXN7KigEEZn-QVacqaZ-tWGBWAQ5r7Q`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    return await response.json();
  }

  return '';
}

// export async function signIn(email, password) {
// }
//
// export async function logOut() {
// }
