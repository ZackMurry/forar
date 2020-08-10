export const checkAuth = () => {
    const url = '/api/v1/user';
    // this is just pseudo code to give you an idea of how to do it
    someRequestMethod(url, (resp) => {
        if (resp.status === 200 && (resp.text() != null && resp.text() != ' ')) {
            setCookie(STORAGE_KEY, resp.body);
        }
    });
}