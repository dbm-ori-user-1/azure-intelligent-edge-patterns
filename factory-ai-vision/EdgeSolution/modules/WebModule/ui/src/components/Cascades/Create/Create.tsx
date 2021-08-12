import React, { useState, useRef } from 'react';
import ReactFlow, { ReactFlowProvider, addEdge, removeElements, Controls, Handle } from 'react-flow-renderer';
import { useSelector } from 'react-redux';

import { trainingProjectIsCascadesFactory } from '../../../store/trainingProjectSlice';

import './dnd.css';

import Sidebar from './Sidebar';
import Node from './Node/Node';
import CustomEdge from './CustomEdge';
import InitialNode from './Node/InitialNode';

const initialElements = [
  {
    id: '1',
    type: 'initial',
    data: {},
    position: { x: 350, y: 50 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const isValidConnection = (connection) => {
  console.log('connection', connection);

  return connection.target === 'dndnode_2';
  // return true;
};

// const nodeTypes = ;

const edgeTypes = {
  customEdge: CustomEdge,
};

const DnDFlow = () => {
  const trainingProjectIsPredictionModelSelector = trainingProjectIsCascadesFactory();
  const trainingProjectList = useSelector(trainingProjectIsPredictionModelSelector);

  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [elements, setElements] = useState(initialElements);
  // @ts-ignore
  const onConnect = (params) => {
    console.log('params', params);

    // @ts-ignore
    setElements((els) => {
      console.log('els', els);

      return addEdge(params, els);
    });
  };
  // const onConnect = (params) =>
  //   setElements((els) => addEdge({ ...params, type: 'buttonedge' }, els));
  // @ts-ignore
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));

  const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const type = event.dataTransfer.getData('application/reactflow');
    const id = event.dataTransfer.getData('id');

    // console.log('type', type);

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const newNode = {
      id: getId(),
      type,
      position,
      // category: cardCategory,
      data: {
        id,
      },
    };

    // @ts-ignore
    setElements((es) => es.concat(newNode));
  };

  // console.log('elements', elements);

  // const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <Sidebar trainingProjectList={trainingProjectList} />
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            elements={elements}
            nodeTypes={{
              initial: () => (
                <>
                  <InitialNode />
                  <Handle
                    type="source"
                    // @ts-ignore
                    position="bottom"
                    // @ts-ignore
                    onConnect={(params) => setElements((els) => addEdge(params, els))}
                  />
                </>
              ),
              model: ({ data, isConnectable }) => {
                const { id } = data;

                return (
                  <>
                    <Node modelId={id} type="model" setElements={setElements} />
                    {/* <Handle
                      // @ts-ignore
                      position="top"
                      type="target"
                      isValidConnection={isValidConnection}
                      onConnect={(params) => {
                        console.log('model params target', params);

                        // @ts-ignore
                        setElements((els) => {
                          console.log('model els', els);

                          return addEdge({ ...params, type: 'customEdge' }, els);
                        });
                      }}
                    /> */}
                  </>
                );
              },
              custom: ({ data, isConnectable }) => {
                const { id } = data;

                return <Node modelId={id} type="custom" setElements={setElements} />;
              },
              export: ({ data, isConnectable }) => {
                const { id } = data;

                return <Node modelId={id} type="export" setElements={setElements} />;
              },
            }}
            edgeTypes={edgeTypes}
            // onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;
