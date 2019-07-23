export const getData = async (url: string) => {
    const response = await fetch(url, {
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return response.json();
};