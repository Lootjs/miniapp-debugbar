<template>
    <div class="miniapp-option">
        <div class="miniapp-option__name">Auth</div>
        <div class="miniapp-option__group">
          <div class="miniapp-option__heading">Get track id</div>
          <div class="miniapp-option__input">
            <select v-model="host">
              <option>https://gateway.chocodev.kz</option>
              <option>https://gateway.test.chocodev.kz</option>
            </select>
          </div>
          <div class="miniapp-option__input">
              <input type="number" v-model="clientId" placeholder="Client ID">
          </div>
          <div class="miniapp-option__input">
              <input type="text" v-model="login" placeholder="Login">
          </div>
          <div class="miniapp-option__input">
              <input type="text" v-model="password" placeholder="Password">
          </div>
          <button @click="handleAuthorize" class="miniapp-option__button">Get track id</button>
          <div v-if="trackId">
            <div class="miniapp-option__heading">Success</div>
            <div v-if="trackId" class="miniapp-option__input">
              <div class="label">Track ID</div>
              <input :value="trackId">
            </div>
            <div v-if="userId" class="miniapp-option__input">
              <div class="label">User ID</div>
              <input :value="userId">
            </div>
            <div v-if="accessToken" class="miniapp-option__input">
              <div class="label">Access token</div>
              <input :value="accessToken">
            </div>
            <div v-if="refreshToken" class="miniapp-option__input">
              <div class="label">Refresh token</div>
              <input :value="refreshToken">
            </div>
          </div>
        </div>
    </div>
</template>

<script>
    import axios from "axios";

    export default {
      data: () => ({
        clientId: '',
        login: '',
        password: '',
        host: 'https://gateway.chocodev.kz',
        accessToken: '',
        refreshToken: '',
        trackId: '',
        userId: '',
      }),
      methods: {
        parseJwt: (token) => {
          try {
            return JSON.parse(atob(token.split('.')[1]));
          } catch (e) {
            return null;
          }
        },
        getTokens: async function () {
          const response = await axios.post(`${this.host}/auth/token`, {
            client_id: this.clientId,
            login: this.login,
            password: this.password,
            grant_type: 'password'
          });

          return {
            accessToken: response.data.data.token,
            refreshToken: response.data.data.refresh_token,
          }
        },
        getTrackIdByToken: async function (token) {
          const response = await axios.post(`${this.host}/auth/track`, {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          return response.data.data.track_id;
        },
        handleAuthorize: async function () {
          const tokens = await this.getTokens();
          this.accessToken = tokens.accessToken;
          this.refreshToken = tokens.refreshToken;
          this.trackId = await this.getTrackIdByToken(tokens.accessToken);
          this.userId = this.parseJwt(this.accessToken).sub;
        }
      }
    }
</script>
