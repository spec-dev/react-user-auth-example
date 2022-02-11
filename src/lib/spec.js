import { createClient } from '@spec.dev/client'

const specUrl = process.env.REACT_APP_SPEC_URL
const specKey = process.env.REACT_APP_SPEC_KEY

// Create Spec Client.
export const spec = createClient(specUrl, specKey)