<template>
  <div id="app">
    <div v-if="!configured">
      <input v-model="address" />
      <button @click="attemptConnection">Start</button>
    </div>

    <div v-else-if="frame !== null" style="display: flex;">
      <div class="grid">
        <div class="row" v-for="(col, colI) of frame" :key="colI">
          <div v-for="(pix, pixI) of col" :key="pixI" :style="{'backgroundColor': pix}" />
        </div>
      </div>

      <div style="padding-left: 2rem;">
        <textarea v-model="log" readonly />
      </div>

      <div style="padding-left: 2rem;">
        <button @click="ws.send('rotary-left')">Rotary - LEFT</button>
        <button @click="ws.send('rotary-press')">Rotary - Press</button>
        <button @click="ws.send('rotary-right')">Rotary - RIGHT</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {return {
    configured: false,
    address: 'ws://localhost:8080',

    frame: null,
    log: '',

    ws: null,
    reconnectAttempts: 0
  }},

  methods: {
    useWS: function(ws) {
      ws.onopen = () => {
        this.configured = true;
        this.reconnectAttempts = 0;
      }

      ws.onmessage = (message) => {
        if(message.data === 'pong') {
          return;
        }

        this.frame = JSON.parse(message.data);
      }

      ws.onclose = () => {
        this.attemptConnection();
      }

      ws.onerror = () => {
        this.attemptConnection();
      }

      this.ws = ws;  
    },

    attemptConnection: function() {
      this.reconnectAttempts++;

      if(this.reconnectAttempts > 10) {
        console.error('Reconnect attempts exceeded.');
        this.configured = false;
        this.reconnectAttempts = 0;
        return;
      }
      
      try {
        const client = new WebSocket(this.address);

        client.onopen = () => {
          this.useWS(client);
          this.ws.onopen();
        }

        client.onerror = () => {
          this.attemptConnection();
        }
      } catch(e) {
        this.attemptConnection();
      }
    }
  }
}
</script>

<style>
.grid {
  display: flex;
  flex-direction: column;
}

.grid .row {
  display: flex;
  flex-direction: row;
}

.grid .row > div {
  width: 32px;
  height: 32px;
}
</style>
