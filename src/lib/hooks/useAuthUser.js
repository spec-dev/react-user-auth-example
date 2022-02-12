import { useState, useEffect } from 'react'
import { spec } from '../spec'

export function useAuthUser() {
    const [auth, setAuth] = useState({
        /**
         * The currently signed-in user (if any).
         */
        user: spec.auth.user(),
        /**
         * Boolean indicating whether the initial auth status is still being determined.
         * This can be true if a user's cached session on initial page load is expired
         * and is still actively being refreshed
         */
        isPending: spec.auth.isPendingInitialState(),
        /**
         * Any auth errors.
         */
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