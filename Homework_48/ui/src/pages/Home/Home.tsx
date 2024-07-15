import Todo from '../../components/Todos/Todo';
import Container from '../../components/ui/Container/Container';
import PageHead from '../../components/ui/PageHead/PageHead';

const Component = () => {
  return (
    <Container>
      <PageHead>Welcome! Create your tasks for all day!</PageHead>
      <Todo />
    </Container>
  );
};

export { Component };
