import type { ITodoDipsatcher, ITodoItem } from '../../../types';

interface CTodoItem extends ITodoItem {
  onDelete: ITodoDipsatcher['delete'];
  onUpdate: ITodoDipsatcher['update'];
}

export default function TodoItem({
  title,
  description,
  status,
  onDelete,
  onUpdate,
}: CTodoItem) {
  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{status}</div>
      <button onClick={() => onUpdate()}>update</button>
      <button onClick={() => onDelete()}>delete</button>
    </div>
  );
}
