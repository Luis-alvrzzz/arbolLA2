import React, { useState } from 'react';
import Tree from 'react-d3-tree'

export function App() {
  let [expression, setExpression] = useState('');

  let [treeData, setTreeData] = useState({
    name: '+',
    children: [
      {name: 'b'},
      {name: 'c'}
    ]
  })

  

      
      
  const addRoot = (raiz, node) => {
    const newRoot = {
      name: raiz,
      children: [node]
    };
    return newRoot
  };
      
  const addChildToNode = (id, childName, node) => {
    if (node.name === id) {
        const newChild = { name: childName, children: [] };
        const updatedNode = { ...node, children: [...(node.children || []), newChild] };
        return updatedNode;
    } else if (node.children && node.children.length > 0) {
        const updatedChildren = node.children.map(child => addChildToNode(id, childName, child));
        return {
            ...node,
            children: updatedChildren
        };
    }
    return node;
  };
    
  const handleAddChildToNode = (node, newNode, tree) => {
      const updatedTreeData = addChildToNode(node, newNode, tree);
      return updatedTreeData
  };

  const replace = (id, childName, node) => {
    if (node.name === id) {
      return {
        ...node,
        name: childName
      };
    } else if (node.children && node.children.length > 0) {
      const updatedChildren = node.children.map((child) => replace(id, childName, child));
      return {
        ...node,
        children: updatedChildren
      };
    }
    return node;
  };

  const buildExpressionTree = (expression) => {
    // Pilas para operadores y operandos
    let operatorsStack = [];
    let operandsStack = [];
  
    // Iterar a través de cada carácter de la expresión
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      
      

      // Si el carácter es '(', agregarlo a la pila de operadores
      if (char === '(') {
        operatorsStack.push(char);
      }
      // Si el carácter es ')', construir subárboles hasta encontrar '('
      else if (char === ')') {
        while (operatorsStack.length > 0 && operatorsStack[operatorsStack.length - 1] !== '(') {
          const operator = operatorsStack.pop();
          const rightOperand = operandsStack.pop();
          const leftOperand = operandsStack.pop();
          // Crear un nuevo nodo con el operador y operandos
          const newNode = { name: operator, children: [leftOperand, rightOperand] };
          operandsStack.push(newNode);
        }
        // Pop '(' de la pila de operadores
        operatorsStack.pop();
      }
      // Si el carácter es un operador ('+', '-', '*', '/'), manejar prioridades
      else if ('+-*/='.includes(char)) {
        while (
          operatorsStack.length > 0 &&
          getPriority(operatorsStack[operatorsStack.length - 1]) >= getPriority(char)
        ) {
          const operator = operatorsStack.pop();
          const rightOperand = operandsStack.pop();
          const leftOperand = operandsStack.pop();
          // Crear un nuevo nodo con el operador y operandos
          const newNode = { name: operator, children: [leftOperand, rightOperand] };
          operandsStack.push(newNode);
        }
        // Agregar el operador actual a la pila de operadores
        operatorsStack.push(char);
      }else if(char===':'){

      }
      // Si el carácter es un operando, agregarlo a la pila de operandos como un nodo
      else {
        operandsStack.push({ name: char });
      }
    }
  
    // Procesar operadores restantes
    while (operatorsStack.length > 0) {
      const operator = operatorsStack.pop();
      const rightOperand = operandsStack.pop();
      const leftOperand = operandsStack.pop();
      // Crear un nuevo nodo con el operador y operandos
      const newNode = { name: operator, children: [leftOperand, rightOperand] };
      operandsStack.push(newNode);
    }
  
    // El árbol final es el único nodo en la pila de operandos
    const finalTree = operandsStack.pop();
  
    // Actualizar el estado con el árbol final
    setTreeData(finalTree);
  };
  
  // Función para obtener la prioridad de un operador
  const getPriority = (operator) => {
    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      case '=':
        return -1;
      default:
        return 0; // para '('
    }
  };
  
      

    return(
        <>
            <div>
                <label>Ingrese la expresión:</label>
                <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)} />
                <button onClick={() => buildExpressionTree(expression)}>Construir Árbol</button>
                
            </div>
            <div style={{ width: '100%', height: '45rem' }}>
                <Tree data={treeData} orientation="vertical" translate={{x:200, y:100}}/>
            </div>
        </>
    )
}