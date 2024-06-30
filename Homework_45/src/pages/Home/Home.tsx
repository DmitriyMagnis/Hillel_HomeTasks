import Container from '../../components/Container/Container';
import PageHead from '../../components/PageHead/PageHead';
import Todo from '../../components/Todos/Todo';

const Component = () => {
  return (
    <Container>
      <PageHead>Welcome! Create your tasks for all day!</PageHead>
      <Todo />
    </Container>
  );
};

export { Component };
