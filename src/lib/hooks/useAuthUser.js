import { useState, useEffect } from 'react'
import { spec } from '../spec'

export function useAuthUser() {
    // Manage the currently authed Spec user.
    const [auth, setAuth] = useState({
        user: spec.auth.user(),
        // Whether the initial auth status is still being determined.
        // This can be true if a user's cached session on initial
        // page load is expired and is actively being refreshed.
        isPending: spec.auth.isPendingInitialState(),
        error: null,
    })

    useEffect(() => {
        setAuth(prevState => ({
            ...prevState,
            user: spec.auth.user(),
            isPending: spec.auth.isPendingInitialState(),
        }))

        // Listen for Spec auth updates.
        // Broadcasted events: https://github.com/spec-dev/auth-js/blob/master/src/lib/events.ts
        const { listener, error } = spec.auth.onStateChange((event, user) => {
            setAuth({ user, isPending: false, error })
        })

        return () => listener && listener.unsubscribe()
    }, [])

    return auth
}