const {GROUP_TOKEN, TOKEN, USER_TOKEN, GROUP_ID, APP_ID, SECURE_KEY, VK_API_VERSION} = process.env;

if (!USER_TOKEN) throw new Error('USER_TOKEN doesn\'t exist');
if (!TOKEN) throw new Error('TOKEN doesn\'t exist');
if (!GROUP_TOKEN) throw new Error('GROUP_TOKEN doesn\'t exist');
if (!GROUP_ID) throw new Error('GROUP_ID doesn\'t exist');
if (!APP_ID) throw new Error('APP_ID doesn\'t exist');
if (!SECURE_KEY) throw new Error('SECURE_KEY doesn\'t exist');
if (!VK_API_VERSION) throw new Error('VK_API_VERSION doesn\'t exist');

const POST_PER_HOURS_VALUE = 4;

const consts = {GROUP_TOKEN, TOKEN, USER_TOKEN, GROUP_ID, APP_ID, SECURE_KEY, VK_API_VERSION, POST_PER_HOURS_VALUE};

export default consts;