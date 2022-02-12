import React, { useState, useCallback } from 'react'
import { useAuthUser } from './lib/hooks/useAuthUser'
import { spec } from './lib/spec'

function App() {
    const { user, isPending } = useAuthUser()
    const [isSigningIn, setIsSigningIn] = useState(false)

    // Kick-off Spec wallet sign-in.
    const signIn = useCallback(async () => {
        // Show loading animation.
        setIsSigningIn(true)

        // Sign-in with Spec.
        const { user, error } = await spec.auth.connect()
        error ? console.error(error) : console.log(user)

        // Stop loading animation.
        setIsSigningIn(false)
    }, [])

    // Sign the user out of all active sessions.
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
        <div className='container'>
            {user ? (
                <div>
                    <div className='output'>{JSON.stringify(user, null, 4)}</div>
                    { user.did?.textRecords?.avatar && <img width="100px" src={user.did.textRecords.avatar}/> }
                    <div>
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                </div>
            ) : (
                <div>
                    <button onClick={signIn}>Sign In</button>
                </div>
            )}
        </div>
    )
}

export default App
