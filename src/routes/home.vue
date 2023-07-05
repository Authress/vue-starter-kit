<template>
  <div className="App">
      <div>
        <a href="https://authress.io" target="_blank">
          <img src="./assets/logo.svg" className="logo" alt="Authress logo" />
        </a>
        <a href="https://authress.io/knowledge-base" target="_blank">
          <img src="./assets/vue.svg" className="logo react" alt="Vue logo" />
        </a>
      </div>
      
      <h1>Authress + Vue</h1>

      <div style="border: 1px white solid; border-radius: 10px; padding: 2rem;">
        <template v-if="starterKitIsConfiguredCorrectly">
          <div>
            <button style="margin-right: 1rem;" @click="login">
              Login
            </button>
            <button style="margin-right: 1rem;" @click="logout">
              Logout
            </button>
            <button style="margin-right: 1rem;" @click="navigateToProtectedPage()">
              Go to Authress Protected Route Page
            </button>
            <button style="margin-right: 1rem;" @click="makeApiCallWithUserToken">
              Call your service API
            </button>

            <br>
            <br>

            <div style="text-align: left">
              <span>User Profile:</span>
              <pre style="white-space: break-spaces; overflowWrap: break-word">{{JSON.stringify(state.userIdentity || 'Not logged in', null, 2)}}</pre>
            </div>

            <br>
            <br>
            <div>
              Edit <code>src/authress.ts</code> to update the login function.
            </div>
          </div>
        </template>
        <template v-else>
          <div style="color: white">
            <div>
              Authress Account Host URL is missing from your configuration. Go to <strong>src</strong> and
              specify the <strong>AuthressLoginHostUrl</strong> at the top of the <code style="color: #dc3545">src/authressClient.ts</code> file.
              <br /><br />
              If you need an account, sign up for free at <a href="https://authress.io/app/#/signup">Authress.io</a>!
            </div>
          </div>
        </template>
      </div>
      <p className="read-the-docs">Click on the Authress logo to learn more</p>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
  
const state = reactive({ userIdentity: null });
const router = useRouter();

import { starterKitIsConfiguredCorrectly, authressLoginClient } from '../authressClient';

const login = async () => {
  console.log('User logging in');
  await authressLoginClient.authenticate({});
};

const logout = async () => {
  console.log('User logging out');
  await authressLoginClient.logout(window.location.href);
  state.userIdentity = null;
};

const navigateToProtectedPage = async () => {
  await router.push('/protected');
};

const makeApiCallWithUserToken = async () => {
  const userAccessToken = await authressLoginClient.ensureToken({});
  try {
    const result = await fetch('http://localhost:8080/api/endpoint', {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });
    console.log('API Call request', result);
  } catch (error) {
    console.error('Error calling API', error);
  }
}

if (starterKitIsConfiguredCorrectly) {
  authressLoginClient.userSessionExists().then((userIsLoggedIn: any) => {
    state.userIdentity = authressLoginClient.getUserIdentity();
    console.log('User is Logged In', userIsLoggedIn, state.userIdentity);
  });
}
</script>

<style lang="scss" scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>