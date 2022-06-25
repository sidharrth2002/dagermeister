import { useCallback } from 'react';
import { Handle, Position, NodeProps } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function TextUpdaterNode({ data }: NodeProps) {
  const onChange = useCallback((evt: any) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={handleStyle} />
    </>
  );
}

export default TextUpdaterNode;
