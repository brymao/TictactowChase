import { createApp, ref, reactive, computed } from 'vue';
import { getSquares, getMoves, initiateMovesList, X, O, whoWins } from '../base.js';

const app = createApp({
  setup() {
    let turn = ref(true);
    const chase = ref(true);
    const moves = reactive(initiateMovesList());

    const xPositions = computed(() => getMoves(X, moves, chase.value));
    const oPositions = computed(() => getMoves(O, moves, chase.value));
    const squares = computed(() => getSquares(xPositions.value, oPositions.value));
    const done = computed(() => whoWins(xPositions.value, oPositions.value));

    function move(position) {
      const player = turn ? X : O;
      console.log('move ', { player, position });

      moves[player].push(position);
      turn = !turn;
    }

    function reset() {
      console.log('reset');

      Object.assign(moves, initiateMovesList());
      turn = true;
    }

    function flip() {
      console.log('flip');

      chase.value = !chase.value;
    }

    return { chase, moves, squares, done, move, reset, flip };
  },
  template: `
<h1
  @click="chase = !chase"
>
  {{done || (chase ? 'TIC TAC CHASE' : 'TIC TAC TOW')}}
</h1>

<div>
  <button
    v-for="(square, index) in squares"
    :key="index"
    @click="!square && move(index)"
    :disabled="!!square || !!done"
  >
    {{square}}
  </button>
</div>

<button 
  id="reset"
  @click="reset()"
>
  RESET
</button>
<br>
<button @click="flip()">flip</button>
`
});

app.mount('#app');
