import React, { useState } from 'react';

const ExpressionTree = () => {
  const [expression, setExpression] = useState('');
  const [expressionTree, setExpressionTree] = useState(null);

  const buildExpressionTree = () => {
    const stack = [];
    let root = null;
    let currentNode = null;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];

      if (char === '(') {
        // Pasar al siguiente carácter (ignorar paréntesis)
      } else if (char === ')') {
        // Manejar paréntesis derecho
      } else if ('+-*/'.includes(char)) {
        // Manejar operadores
        const newNode = { value: char, left: null, right: null };

        if (!currentNode) {
          // Si no hay nodo actual, asignar como raíz
          root = newNode;
        } else {
          // Si hay nodo actual, insertar el nuevo nodo como hijo
          newNode.left = currentNode.right;
          currentNode.right = newNode;
        }

        currentNode = newNode;
      } else {
        // Manejar operandos
        const newNode = { value: char, left: null, right: null };

        if (!currentNode) {
          // Si no hay nodo actual, asignar como raíz
          root = newNode;
        } else {
          // Si hay nodo actual, insertar el nuevo nodo como hijo
          newNode.left = currentNode.right;
          currentNode.right = newNode;
        }

        currentNode = newNode;
      }
    }

    // Actualizar el estado con el árbol de expresión construido
    setExpressionTree(root);
  };

  const renderTree = (node) => {
    if (!node) {
      return '';
    }

    const left = renderTree(node.left);
    const right = renderTree(node.right);

    return `${node.value}\n${left}${right}`;
  };

  return (
    <div>
      <div>
        <label>Ingrese la expresión:</label>
        <input
          type="text"
          value={expression}
          onChange={(e) => setExpression(e.target.value)}
        />
        <button onClick={buildExpressionTree}>Construir Árbol</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Árbol de Expresión:</h3>
        <pre>{renderTree(expressionTree)}</pre>
      </div>
    </div>
  );
};

export default ExpressionTree;
