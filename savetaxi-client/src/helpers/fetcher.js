const fetcher = async (url, method, body) => {
    const bodyOption = { body: body ? JSON.stringify(body) : undefined };
    const jwt = document.cookie.split('jwt=')[1]?.split(';')[0];
    const res = await fetch(url, {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            jwt,
        },
        ...(body ? bodyOption : {}),
    });
    return res.json();
};

module.exports = { fetcher };
