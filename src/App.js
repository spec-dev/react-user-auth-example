import React, { useState, useCallback } from 'react'
import { useAuthUser } from './lib/hooks/useAuthUser'
import { spec } from './lib/spec'

function App() {
    const { user, isPending } = useAuthUser()
    const [isSigningIn, setIsSigningIn] = useState(false)

    const signIn = useCallback(async () => {
        // Show loading animation.
        setIsSigningIn(true)

        // Sign-in with Spec.
        const { user, error } = await spec.auth.connect()
        error ? console.error(error) : console.log(user)

        // Stop loading animation.
        setIsSigningIn(false)
    }, [])

    const signOut = useCallback(async () => {
        const { error } = await spec.auth.disconnect()
        if (error) console.error(error)
    }, [])

    // If initial auth state is still being determined...
    if (isPending) {
        return <div></div>
    }

    // If actively signing in...
    if (isSigningIn) {
        return <div>Signing in...</div>
    }

    // Either show the authed "app" or the sign-in "page".
    return (
        <div className="container">
            {user ? (
                <div>
                    <div>{user.did?.domain || user.id}</div>
                    <div>
                        <button onClick={signOut}>
                            Sign Out
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <button onClick={signIn}>
                        Sign In
                    </button>
                </div>
            )}
        </div>
    )
}

export default App
