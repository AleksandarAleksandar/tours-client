let config = {};

config.API_PREFIX_PROD = 'https://sheltered-fortress-92649.herokuapp.com/';
config.TOKEN_STORAGE_KEY = 'local_token'; // name of the token in browser localStorage
config.TOKEN_HEADER_KEY = 'X-AuthToken'; // name of the token in AJAX header (backend require this name)
config.use_jwt = true;
config.useCookieToken = true; // TODO
config.useHeaderToken = true;

export { config }