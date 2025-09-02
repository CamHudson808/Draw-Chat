import { createClient } from '@supabase/supabase-js'
// require('dotenv').config()

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

if(!supabaseUrl) {
    throw Error("Supabase url is undefined");
}

if(!supabaseKey) {
    throw Error("Supabase Key is undefined");
}
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;