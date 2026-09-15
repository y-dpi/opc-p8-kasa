// Name of the cookie that holds the session.
//
// It lives apart from the session helpers so the route proxy, which runs before 'next/headers'
// is available, can read the cookie without pulling those helpers into its bundle.
export const SESSION_COOKIE = 'kasa-session-token';
