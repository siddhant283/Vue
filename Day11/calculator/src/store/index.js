import { createStore } from 'vuex'

export default createStore({
  state: {
    previous: null,
    current: '0',
    operator: null,
    operatorClicked: false,
    result: '0',
    history: [],
    calActive: true

  },
  mutations: {
    clear(state) {
      state.current = '0';
      state.result = '0';
    },

    percent(state) {
      state.result = '0'
      var regex = new RegExp("^[0-9.()]+$");
      var perStr
      for (var i = state.current.length - 1; i >= 0; i--) {
        if (regex.test(state.current.charAt(i))) {
          if (i === 0) {
            state.current = '0';
          }
          else {
            continue;
          }
        }
        else {
          perStr = state.current.substring(i + 1)
          for (var j = 0; j < perStr.length; j++) {
            if (perStr.charAt(j) == '(' || perStr.charAt(j) == ')') {
              alert('Syntax Error: Please Recalculate');
              return;
            }
          }
          perStr = parseFloat(perStr).toFixed(3) / 100;
          try {
            var tempFinal = state.current.substring(0, i)
            var tempResult = eval(tempFinal).toFixed(3);
            perStr = (tempResult * perStr).toFixed(3);
            var newStr = tempFinal + state.current.charAt(i) + perStr;
            state.current = newStr

          }
          catch (err) {
            alert("Syntax Error: Please recalculate!")
          }
          break;
        }
      }
      state.result = `${parseFloat(state.result) / 100}`;
    },
    append(state, number) {
      var regex = new RegExp("^[0-9.(]+$");
      state.current = `${state.current}${number}`;
      if (state.current.charAt(0) === '0' && regex.test(state.current.charAt(1))) {
        state.current = state.current.substring(1);
      }
    },
    calculate(state) {
      var operation = state.current;
      try {
        var final = state.current;
        if (Number.isInteger(eval(final))) {
          state.result = eval(final);
        }
        else {
          state.result = eval(final).toFixed(3);
        }

        operation = operation + ' = ' + state.result;
      }
      catch (err) {
        alert("Improper Use of Brackets!")
      }
      state.history.push(operation);
    },
    updateScreen(state) {
      state.calActive = !(state.calActive)
    }

  },
  actions: {
  },
  modules: {
  }
})
