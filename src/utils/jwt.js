export function isTokenExpired(token) {
    try {
        const [, payload] = token.split(".");
        const decoded = JSON.parse(atob(payload));
        const exp = decoded.exp;
        return Date.now() >= exp * 1000;
    }
    catch {
        return true;
    }
}
