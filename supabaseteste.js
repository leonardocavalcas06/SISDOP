import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Substitua pelos dados do seu projeto Supabase
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

// Cria e exporta o cliente Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

// Exporta o cliente para ser usado em outros arquivos
export { supabase };