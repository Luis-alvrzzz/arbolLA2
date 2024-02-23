import React from 'react';

const TreeNode = ({ data }) => {
  return (
    <div>
      {data.label}
      {data.children && (
        <div style={{ marginLeft: '20px' }}>
          {data.children.map((child, index) => (
            <TreeNode key={index} data={child} />
          ))}
        </div>
      )}
    </div>
  );
};

const Tree = ({ root }) => {
  return (
    <div>
      <h2>Árbol de React</h2>
      <TreeNode data={root} />
    </div>
  );
};



