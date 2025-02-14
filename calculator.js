let display = document.getElementById('display');

function appendToDisplay(value) {
  const current = display.value;
  const lastChar = current.slice(-1);
  const operators = ['+', '-', '*', '/', '%'];

  if (operators.includes(value)) {
    if (current === '' && value !== '-') {
      return;
    }
    if (operators.includes(lastChar)) {
      if (value === '-' && !['-', '+', '*', '/'].includes(lastChar)) {
        display.value = current + value;
      } else {
        display.value = current.slice(0, -1) + value;
      }
      return;
    }
  }

  display.value += value;
}

function clearEntry() {
  display.value = '';
}

function clearDisplay() {
  display.value = '';
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function tokenize(expression) {
  const regex = /(\d+(?:\.\d+)?|\.\d+)(%?)|\+|\-|\*|\//g;
  const tokens = [];
  let match;

  while ((match = regex.exec(expression)) !== null) {
    if (match[1] !== undefined) {
      tokens.push({
        type: 'number',
        value: parseFloat(match[1]),
        isPercentage: match[2] === '%'
      });
    } else {
      tokens.push({
        type: 'operator',
        value: match[0]
      });
    }
  }

  return tokens;
}

function evaluate(tokens) {
  if (tokens.length === 0) return 0;

  let currentValue = tokens[0].value;
  if (tokens[0].isPercentage) {
    throw new Error('Invalid expression');
  }

  for (let i = 1; i < tokens.length; i += 2) {
    const operatorToken = tokens[i];
    if (operatorToken.type !== 'operator') {
      throw new Error('Invalid operator');
    }

    const operandToken = tokens[i + 1];
    if (!operandToken || operandToken.type !== 'number') {
      throw new Error('Invalid operand');
    }

    let operand = operandToken.value;
    if (operandToken.isPercentage) {
      if (operatorToken.value === '+' || operatorToken.value === '-') {
        operand = currentValue * operand / 100;
      } else {
        operand = operand / 100;
      }
    }

    switch (operatorToken.value) {
      case '+':
        currentValue += operand;
        break;
      case '-':
        currentValue -= operand;
        break;
      case '*':
        currentValue *= operand;
        break;
      case '/':
        if (operand === 0) throw new Error('Division by zero');
        currentValue /= operand;
        break;
      default:
        throw new Error('Unknown operator');
    }
  }

  return currentValue;
}

function calculate() {
  try {
    const expression = display.value;
    const tokens = tokenize(expression);
    if (tokens.length === 0) {
      display.value = '';
      return;
    }
    const result = evaluate(tokens);
    display.value = result;
  } catch (error) {
    display.value = 'Error';
  }
}